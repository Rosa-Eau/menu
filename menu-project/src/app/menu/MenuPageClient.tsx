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
  Object.values(grouped).forEach(arr => arr.sort((a, b) => {
    // 먼저 제목으로 비교
    const titleCompare = a.title.localeCompare(b.title, 'ko');
    // 제목이 같으면 가격으로 비교 (낮은 가격이 먼저)
    return titleCompare !== 0 ? titleCompare : a.price - b.price;
  }));

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
    <main className="w-screen min-h-screen font-sans bg-[#fef3c7] text-black relative pb-5 flex items-center justify-center" style={{ fontFamily: 'Chosunilbo_myungjo' }}>
      {/* 슬라이드 영역 */}
      <div
        ref={containerRef}
        className="flex overflow-x-scroll snap-x snap-mandatory w-full h-full scroll-smooth scrollbar-none"
        style={{ scrollbarWidth: 'none' }}
      >
        {categories.map(([category, items]) => {
          // 20개씩 3열로 나누기 (왼쪽부터 채움)
          const itemsPerColumn = 20;
          const columns = [[], [], []] as MenuItem[][];
          items.forEach((item, idx) => {
            columns[Math.floor(idx / itemsPerColumn)]?.push(item);
          });

          return (
            <section
              key={category}
              className="min-w-full snap-start flex flex-col items-center justify-start px-4 sm:px-8 md:px-14 pt-4 mb-0 pb-4"
            >
              {/* 카테고리명 및 설명 */}
              <h2
                className="text-4xl sm:text-5xl text-extrabold md:text-6xl lg:text-7xl text-center mb-8 tracking-tighter px-4 sm:px-6 md:px-14"
                style={{ fontFamily: 'GabiaCheongyeon', color: 'black', letterSpacing: '-0.15em' }}
              >
                {category}
              </h2>

              <div className="grid grid-cols-3 gap-x-1 gap-y-1 w-full max-w-4xl mx-auto">
                {columns.map((col, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-y-0.5 sm:gap-y-1 md:gap-y-1.5">
                    {col.map((item) => (
                      <Link href={`/menu/${item.id}`} key={item.id}>
                        <div className="flex justify-between items-start min-w-0 text-xs sm:text-sm md:text-base lg:text-lg cursor-pointer hover:bg-[#fde68a] rounded-sm transition px-0.5 py-0.5 m-1">
                          <div className="min-w-0">
                            <div className="mb-0 p-0 leading-none">
                              <div className="font-extrabold text-black truncate text-[8.5px] sm:text-[10.5px] md:text-[12.5px] lg:text-[14.5px] m-0 p-0 leading-none">{item.title}</div>
                              {item.description && (
                                <div className="text-[5.5px] sm:text-[7.5px] md:text-[8.5px] lg:text-[9.5px] text-gray-600 break-words whitespace-normal mt-1 p-0 leading-none line-clamp-1">{item.description}</div>
                              )}
                            </div>
                          </div>
                          <div className="font-bold text-[#b45309] text-right min-w-[24px] pl-1 text-[8.5px] sm:text-[10.5px] md:text-[12.5px] lg:text-[14.5px]">
                            {(item.price / 1000).toFixed(1)}
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
