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
    <main className="w-screen min-h-screen font-sans bg-[#fef3c7] text-black relative pb-16" style={{ fontFamily: 'Chosunilbo_myungjo' }}>
      {/* 슬라이드 영역 */}
      <div
        ref={containerRef}
        className="flex overflow-x-scroll snap-x snap-mandatory w-full h-full scroll-smooth scrollbar-none"
        style={{ scrollbarWidth: 'none' }}
      >
        {categories.map(([category, items]) => {
          // 세로 우선 2열 분할
          const half = Math.ceil(items.length / 2);
          const col1 = items.slice(0, half);
          const col2 = items.slice(half);

          return (
            <section
              key={category}
              className="min-w-full snap-start flex flex-col items-center justify-start px-4 sm:px-8 md:px-16 pt-2"
            >
              {/* 카테고리명 및 설명 */}
              <h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center mb-14 mt-12 tracking-tight drop-shadow-sm px-4 sm:px-8 md:px-16"
                style={{ fontFamily: 'LOTTERIACHAB', color: '#752B22' }}
              >
                {category}
              </h2>

              <div className="grid grid-cols-2 gap-x-8 gap-y-5 w-full max-w-2xl mx-auto">
                {[col1, col2].map((col, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-y-5 sm:gap-y-6 md:gap-y-8">
                    {col.map((item) => (
                      <Link href={`/menu/${item.id}`} key={item.id}>
                        <div className="flex justify-between items-start min-w-0 text-xs sm:text-sm md:text-base lg:text-lg cursor-pointer hover:bg-[#fde68a] rounded transition px-1">
                          <div className="min-w-0">
                            <div className="font-bold text-black truncate text-sm sm:text-base md:text-lg lg:text-xl">{item.title}</div>
                            {item.description && (
                              <div className="text-[9px] sm:text-xs md:text-sm lg:text-base text-gray-600 truncate">{item.description}</div>
                            )}
                          </div>
                          <div className="font-bold text-[#b45309] text-right min-w-[32px] pl-2 text-sm sm:text-base md:text-lg lg:text-xl">
                            {(item.price / 10000).toFixed(1)}
                          </div>
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
      <style jsx global>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}
