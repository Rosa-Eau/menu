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
    <main className="bg-white min-h-screen px-4 py-12 text-black font-sans flex items-center justify-center" style={{ fontFamily: 'Chosunilbo_myungjo' }}>
      <div className="max-w-2xl mx-auto bg-white/70 rounded-xl shadow p-8 md:p-16">
        <h1 className="text-3xl md:text-5xl mb-8" text-extrabold tracking-tighter style={{ fontFamily: 'GabiaCheongyeon', color: '#f59e1b', letterSpacing: '-0.15em'}}>{item.title}</h1>
        {item.description && <p className="text-lg md:text-2xl font-semibold text-gray-700 mb-8">{item.description}</p>}
        <p className="text-lg md:text-2xl font-bold text-[#b45309] mb-10">{(item.price / 1000).toFixed(1)}</p>

        <ul className="space-y-4 mb-12 text-sm md:text-lg">
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
          <div className="mt-12">
            <div className="font-bold mb-4 text-base md:text-lg">• 제품설명</div>
            <div className="text-sm md:text-lg text-gray-800 whitespace-pre-line">{detail.info}</div>
          </div>
        )}
      </div>
    </main>
  );
}