// src/app/menu/[id]/page.tsx

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

type Props = {
  params: { id: number };
};

export default async function Page({ params }: any) {
  const supabase = await createSupabaseServerClient();
  const { data: item } = await supabase
    .from('menu')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!item) return notFound();

  return (
    <main className="bg-[#fef3c7] min-h-screen px-6 py-12 text-black font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{item.title}</h1>
        {item.description && <p className="text-lg text-gray-700 mb-6">{item.description}</p>}
        <p className="text-2xl font-semibold text-[#78350f]">
          {(item.price / 10000).toFixed(1)}만원
        </p>
      </div>
    </main>
  );
}