// src/app/menu/[id]/page.tsx

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export default async function Page({ params }: any) {
  const supabase = await createSupabaseServerClient();
  const { data: item } = await supabase
    .from('menu')
    .select('*, menu_detail(abv, cask, nose, palate, finish, info)')
    .eq('id', params.id)
    .single();

  if (!item) return notFound();
  const detail = item.menu_detail?.[0] || {};

  return (
    <main className="bg-white min-h-screen px-4 py-12 text-black font-sans">
      <div className="max-w-2xl mx-auto bg-white/70 rounded-xl shadow p-8 md:p-16">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-6" style={{ color: '#f59e1b' }}>{item.title}</h1>
        {item.description && <p className="text-sm md:text-base text-gray-700 mb-6">{item.description}</p>}
        <p className="text-base md:text-lg font-bold text-[#b45309] mb-8">{(item.price / 10000).toFixed(1)}만원</p>

        <ul className="space-y-3 mb-10 text-xs md:text-sm">
          {detail.abv && (
            <li><span className="font-bold">• 도수:</span> {detail.abv}</li>
          )}
          {detail.cask && (
            <li><span className="font-bold">• Cask:</span> {detail.cask}</li>
          )}
          {(detail.nose || detail.palate || detail.finish) && (
            <li className="mt-4 font-bold">테이스팅 노트</li>
          )}
          {detail.nose && (
            <li className="ml-4"><span className="font-semibold">NOSE</span>: {detail.nose}</li>
          )}
          {detail.palate && (
            <li className="ml-4"><span className="font-semibold">PALATE</span>: {detail.palate}</li>
          )}
          {detail.finish && (
            <li className="ml-4"><span className="font-semibold">FINISH</span>: {detail.finish}</li>
          )}
        </ul>

        {detail.info && (
          <div className="mt-10">
            <div className="font-bold mb-3 text-xs md:text-sm">• 제품설명</div>
            <div className="text-xs md:text-sm text-gray-800 whitespace-pre-line">{detail.info}</div>
          </div>
        )}
      </div>
    </main>
  );
}