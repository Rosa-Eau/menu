// src/app/page.tsx
import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function MenuPage() {
    const supabase = await createSupabaseServerClient();

    const { data: menuItems, error } = await supabase
        .from('menu')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('메뉴 불러오기 실패:', error.message);
        return <p>메뉴를 불러올 수 없습니다.</p>;
    }

    return (
        <main className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">📋 오늘의 메뉴판</h1>
            {menuItems.length === 0 ? (
                <p>등록된 메뉴가 없습니다.</p>
            ) : (
                <ul className="space-y-4">
                    {menuItems.map((item: any) => (
                        <li key={item.id} className="p-4 border rounded shadow">
                            <h2 className="text-xl font-semibold">{item.title}</h2>
                            <p className="text-gray-600">{item.description}</p>
                            <p className="font-bold mt-1">{item.price.toLocaleString()}원</p>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
