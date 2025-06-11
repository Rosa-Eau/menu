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

    if (!menuItems || menuItems.length === 0) {
        return (
            <main className="bg-[#fef3c7] min-h-screen flex flex-col items-center justify-center text-center p-6">
                <h1 className="font-retro mt-20 text-4xl text-center text-[#f59e0b] tracking-tight drop-shadow-[2px_2px_0px_white]">
                    YUZZUP
                </h1>
                <p className="text-gray-700 text-lg mt-6">등록된 메뉴가 없습니다.</p>
            </main>
        );
    }

    const groupedByCategory = menuItems.reduce((acc: any, item: any) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    return (
        <main className="bg-[#fef3c7] min-h-screen p-6 flex flex-col items-center justify-start">
            <div className="w-full max-w-md">
                <h1 className="mt-20 text-5xl font-extrabold text-center text-[#f59e0b] tracking-tight drop-shadow-[2px_2px_0px_white]">
                    YUZZUP
                </h1>

                <div className="mt-12 space-y-10">
                    {Object.entries(groupedByCategory).map(([category, items]) => (
                        <section key={category}>
                            <h2 className="text-2xl font-semibold bg-[#f59e0b] text-white px-4 py-2 rounded text-center shadow-md mb-4">
                                {category}
                            </h2>
                            <ul className="space-y-3">
                                {(items as any[]).map((item) => (
                                    <li
                                        key={item.id}
                                        className="bg-white rounded-xl shadow px-4 py-3 flex justify-between items-start"
                                    >
                                        <div className="flex-1 pr-2">
                                            <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                                            {item.description && (
                                                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                                            )}
                                        </div>
                                        <span className="text-md font-semibold text-[#f59e0b] whitespace-nowrap">
                                            {item.price.toLocaleString()}원
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
}