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
    // 앞의 세 글자 비교
    const aPrefix = a.title.slice(0, 3);
    const bPrefix = b.title.slice(0, 3);
    
    // 앞의 세 글자가 같으면 가격순으로 정렬
    if (aPrefix === bPrefix) {
      return a.price - b.price;
    }
    
    // 앞의 세 글자가 다르면 가나다순으로 정렬
    return a.title.localeCompare(b.title, 'ko');
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
          // 10개씩 열로 나누기
          const itemsPerColumn = 10;
          const columns = [];
          for (let i = 0; i < items.length; i += itemsPerColumn) {
            columns.push(items.slice(i, i + itemsPerColumn));
          }

          // 20개씩 페이지로 나누기
          const itemsPerPage = 20;
          const pages = [];
          for (let i = 0; i < items.length; i += itemsPerPage) {
            pages.push(items.slice(i, i + itemsPerPage));
          }

          return pages.map((pageItems, pageIndex) => {
            // 현재 페이지의 아이템들을 10개씩 열로 나누기
            const pageColumns = [];
            for (let i = 0; i < pageItems.length; i += itemsPerColumn) {
              pageColumns.push(pageItems.slice(i, i + itemsPerColumn));
            }

            return (
              <section
                key={`${category}-${pageIndex}`}
                className="min-w-full snap-start flex flex-col items-center justify-start px-4 sm:px-8 md:px-16 pt-2"
              >
                {/* 카테고리명 및 설명 */}
                <h2
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center mb-10 mt-8 tracking-tight drop-shadow-sm px-4 sm:px-8 md:px-16"
                  style={{ fontFamily: 'LOTTERIACHAB', color: '#752B22' }}
                >
                  {category}
                </h2>

                <div className="grid grid-cols-2 gap-x-8 gap-y-5 w-full max-w-2xl mx-auto">
                  {pageColumns.map((col, colIdx) => (
                    <div key={colIdx} className="flex flex-col gap-y-5 sm:gap-y-6 md:gap-y-8">
                      {col.map((item) => (
                        <Link href={`/menu/${item.id}`} key={item.id}>
                          <div className="flex justify-between items-start min-w-0 text-xs sm:text-sm md:text-base lg:text-lg cursor-pointer hover:bg-[#fde68a] rounded transition px-1">
                            <div className="min-w-0">
                              <div className="font-extrabold text-black truncate text-sm sm:text-base md:text-lg lg:text-xl">{item.title}</div>
                              {item.description && (
                                <div className="text-[9px] sm:text-xs md:text-sm lg:text-base text-gray-600 truncate">{item.description}</div>
                              )}
                            </div>
                            <div className="font-bold text-[#b45309] text-right min-w-[32px] pl-2 text-sm sm:text-base md:text-lg lg:text-xl">
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
          });
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
