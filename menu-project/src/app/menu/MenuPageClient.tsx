'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type MenuItem = {
    id: string;
    title: string;
    description?: string;
    price: number;
    category: string;
};

export default function MenuPageClient({ menuItems }: { menuItems: MenuItem[] }) {
    const grouped = menuItems.reduce((acc: Record<string, MenuItem[]>, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    const categories = Object.entries(grouped);
    const containerRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);

    const scrollToIndex = (i: number) => {
        const container = containerRef.current;
        if (!container || i < 0 || i >= categories.length) return;

        const width = container.clientWidth;
        container.scrollTo({ left: i * width, behavior: 'smooth' });
        setIndex(i);
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const updateIndex = () => {
            const newIndex = Math.round(container.scrollLeft / container.clientWidth);
            setIndex(newIndex);
        };

        container.addEventListener('scroll', updateIndex);
        window.addEventListener('resize', updateIndex);

        return () => {
            container.removeEventListener('scroll', updateIndex);
            window.removeEventListener('resize', updateIndex);
        };
    }, []);

    return (
        <main className="w-screen h-screen overflow-hidden font-sans bg-[#fef3c7] text-black relative">
            {/* ◀ 버튼 */}
            <button
                onClick={() => scrollToIndex(index - 1)}
                disabled={index === 0}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#78350f] text-white rounded-full w-10 h-10 z-10 disabled:opacity-30"
            >
                ◀
            </button>

            {/* ▶ 버튼 */}
            <button
                onClick={() => scrollToIndex(index + 1)}
                disabled={index === categories.length - 1}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#78350f] text-white rounded-full w-10 h-10 z-10 disabled:opacity-30"
            >
                ▶
            </button>

            {/* 슬라이드 영역 */}
            <div
                ref={containerRef}
                className="flex overflow-x-auto snap-x snap-mandatory w-full h-full scroll-smooth"
            >
                {categories.map(([category, items]) => {
                    const columns: MenuItem[][] = [[], []];
                    items.forEach((item, idx) => columns[idx % 2].push(item));

                    return (
                        <section
                            key={category}
                            className="min-w-full snap-start flex flex-col items-center justify-start px-6 py-12"
                        >
                            <h2 className="text-4xl md:text-5xl font-extrabold text-center text-black mb-16">
                                {category}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
                                {columns.map((col, colIdx) => (
                                    <div key={colIdx} className="space-y-6">
                                        {col.map((item) => (
                                            <Link href={`/menu/${item.id}`} key={item.id}>
                                                <div className="flex justify-between items-start px-1 py-3 bg-white rounded-xl shadow hover:bg-[#fde68a] cursor-pointer transition">
                                                    <div>
                                                        <h3 className="text-lg md:text-xl font-bold leading-tight">{item.title}</h3>
                                                        {item.description && (
                                                            <p className="text-sm text-[#6b7280] leading-snug">{item.description}</p>
                                                        )}
                                                    </div>
                                                    <p className="text-lg font-semibold text-right min-w-[60px] ml-4 text-[#78350f]">
                                                        {(item.price / 10000).toFixed(1)}만원
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>
        </main>
    );
}
