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
  const grouped = (menuItems || []).reduce((acc: Record<string, MenuItem[]>, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  // 각 카테고리별로 title 기준 가나다순 정렬
  Object.values(grouped).forEach(arr => arr.sort((a, b) => a.title.localeCompare(b.title, 'ko')));

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
      {/* 슬라이드 영역 */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory w-full h-full scroll-smooth"
      >
        {categories.map(([category, items]) => {
          const columns: MenuItem[][] = [[], []];
          items.forEach((item, idx) => {
            if (columns[idx % 2].length < 10) {
              columns[idx % 2].push(item);
            }
          });

          return (
            <section
              key={category}
              className="min-w-full snap-start flex flex-col items-center justify-start px-4 sm:px-2 py-2 h-full"
            >
              {/* 카테고리명 및 설명 */}
              <h2 className="text-2xl md:text-4xl font-extrabold text-center text-[#78350f] mb-10 mt-2 tracking-tight drop-shadow-sm">
                {category}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-5 w-full max-w-5xl">
                {items.map((item) => (
                  <Link href={`/menu/${item.id}`} key={item.id}>
                    <div className="flex justify-between items-start min-w-0 text-[11px] sm:text-xs lg:text-sm cursor-pointer hover:bg-[#fde68a] rounded transition px-1">
                      <div className="min-w-0">
                        <div className="font-bold text-[#78350f] truncate text-[12px] sm:text-sm lg:text-base">{item.title}</div>
                        {item.description && (
                          <div className="text-[8px] sm:text-[9px] lg:text-[10px] text-gray-600 truncate">{item.description}</div>
                        )}
                      </div>
                      <div className="font-bold text-[#b45309] text-right min-w-[32px] pl-2 text-[12px] sm:text-sm lg:text-base">
                        {(item.price / 10000).toFixed(1)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
