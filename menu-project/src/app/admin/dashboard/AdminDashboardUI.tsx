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
};

export default function AdminDashboardUI() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const router = useRouter();

    const fetchMenu = async () => {
        const { data } = await supabase
            .from('menu')
            .select('id, title, price, description, category')
            .order('created_at', { ascending: false });
        setMenuItems(data || []);
    };

    const handleAdd = async (newItem: Omit<MenuItem, 'id'>) => {
        const { error } = await supabase.from('menu').insert([newItem]);
        if (!error) fetchMenu();
    };

    const handleUpdate = async (item: MenuItem) => {
        await supabase.from('menu').update(item).eq('id', item.id);
        fetchMenu();
    };

    const handleDelete = async (id: number) => {
        await supabase.from('menu').delete().eq('id', id);
        fetchMenu();
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    return (
        <main className="max-w-xl mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">👨‍🍳 관리자 메뉴판</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                >
                    로그아웃
                </button>
            </div>

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