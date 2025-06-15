'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabase/client';
import AddMenuForm from './AddMenuForm';
import MenuItemRow from './MenuItemRow';

type MenuItem = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    abv?: string;
    cask?: string;
    nose?: string;
    palate?: string;
    finish?: string;
    info?: string;
    detail_id?: number;
};

export default function AdminDashboardUI() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const router = useRouter();

    const fetchMenu = async () => {
        const { data } = await supabase
            .from('menu')
            .select('id, title, price, description, category, menu_detail:menu_detail(id, abv, cask, nose, palate, finish, info)')
            .order('created_at', { ascending: false });
        const items = (data || []).map((item: any) => ({
            ...item,
            ...(item.menu_detail?.[0] && {
                abv: item.menu_detail[0].abv,
                cask: item.menu_detail[0].cask,
                nose: item.menu_detail[0].nose,
                palate: item.menu_detail[0].palate,
                finish: item.menu_detail[0].finish,
                info: item.menu_detail[0].info,
                detail_id: item.menu_detail[0].id,
            })
        }));
        setMenuItems(items);
    };

    const handleAdd = async (newItem: Omit<MenuItem, 'id' | 'detail_id'>) => {
        const { data, error } = await supabase.from('menu').insert([
            {
                title: newItem.title,
                price: newItem.price,
                description: newItem.description,
                category: newItem.category,
            }
        ]).select('id');
        if (error || !data || !data[0]?.id) {
            console.error('menu insert error:', error);
            return { success: false, error: error?.message || 'Unknown error' };
        }
        const menuId = data[0].id;
        const { error: detailError } = await supabase.from('menu_detail').insert([
            {
                menu_id: menuId,
                abv: newItem.abv,
                cask: newItem.cask,
                nose: newItem.nose,
                palate: newItem.palate,
                finish: newItem.finish,
                info: newItem.info,
            }
        ]);
        if (detailError) {
            console.error('menu_detail insert error:', detailError);
            return { success: false, error: detailError?.message || 'Unknown error' };
        }
        fetchMenu();
        return { success: true };
    };

    const handleUpdate = async (item: MenuItem) => {
        await supabase.from('menu').update({
            title: item.title,
            price: item.price,
            description: item.description,
            category: item.category,
        }).eq('id', item.id);
        if (item.detail_id) {
            await supabase.from('menu_detail').update({
                abv: item.abv,
                cask: item.cask,
                nose: item.nose,
                palate: item.palate,
                finish: item.finish,
                info: item.info,
            }).eq('id', item.detail_id);
        }
        fetchMenu();
    };

    const handleDelete = async (id: number) => {
        await supabase.from('menu').delete().eq('id', id);
        fetchMenu();
    };

    const handleLogout = async () => {
        try {
            // Supabase 세션 제거
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            // 로컬 스토리지의 Supabase 관련 데이터 제거
            localStorage.removeItem('supabase.auth.token');
            localStorage.removeItem('sb-auth-token');
            
            // 세션 스토리지도 정리
            sessionStorage.removeItem('supabase.auth.token');
            sessionStorage.removeItem('sb-auth-token');

            // 페이지 리다이렉트
            router.push('/admin/login');
            router.refresh(); // Next.js 캐시 초기화
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    return (
        <main className="max-w-xl mx-auto p-6 space-y-6 bg-white dark:bg-black text-black dark:text-white min-h-screen" style={{ fontFamily: 'Chosunilbo_myungjo' }}>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">👨‍🍳 관리자 메뉴판</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                >
                    로그아웃
                </button>
            </div>

            {/* AddMenuForm 내부도 다크모드 대응 필요!! */}
            <AddMenuForm onAdd={handleAdd} />

            <ul className="space-y-4">
                {menuItems.map((item) => (
                    <MenuItemRow
                        key={item.id}
                        item={item}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                    />
                ))}
            </ul>
        </main>
    );
}