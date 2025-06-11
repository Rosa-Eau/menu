'use client';

import { useState, useEffect } from 'react';
import supabase from '@/lib/supabase/client';
import AddMenuForm from './AddMenuForm';
import MenuItemRow from './MenuItemRow';

type MenuItem = {
    id: number;
    title: string;
    price: number;
    description: string;
};

export default function AdminDashboardUI() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    const fetchMenu = async () => {
        const { data } = await supabase.from('menu').select('*').order('created_at', { ascending: false });
        setMenuItems(data || []);
    };

    const handleAdd = async (newItem: Omit<MenuItem, 'id'>) => {
        console.log('📤 insert 시도:', newItem);
        const { data, error } = await supabase.from('menu').insert([newItem]);
        console.log('📥 insert 결과:', { data, error });
    };


    const handleUpdate = async (item: MenuItem) => {
        await supabase.from('menu').update(item).eq('id', item.id);
        fetchMenu();
    };

    const handleDelete = async (id: number) => {
        await supabase.from('menu').delete().eq('id', id);
        fetchMenu();
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    return (
        <main className="max-w-xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">👨‍🍳 관리자 메뉴판</h1>
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