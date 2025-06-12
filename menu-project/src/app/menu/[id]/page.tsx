// app/menu/[id]/page.tsx
import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function MenuDetail({ params }: { params: { id: string } }) {
  const supabase = await createSupabaseServerClient();
  const { data: item, error } = await supabase
    .from('menu')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !item) {
    return (
      <main className="min-h-screen flex items-center justify-center text-red-600">
        메뉴 정보를 불러올 수 없습니다.
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen p-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center text-[#f59e0b] mb-6">{item.title}</h1>

      {item.image_url && (
        <img
          src={item.image_url}
          alt={item.title}
          className="w-full max-w-md rounded-xl shadow mb-8"
        />
      )}

      <section className="w-full max-w-xl text-gray-800">
        {item.description && <p className="text-lg mb-4">{item.description}</p>}
        <ul className="space-y-2 text-md">
          {item.tasting_notes && (
            <li>
              <strong>테이스팅 노트:</strong> {item.tasting_notes}
            </li>
          )}
          {item.nose && (
            <li>
              <strong>NOSE:</strong> {item.nose}
            </li>
          )}
          {item.palate && (
            <li>
              <strong>PALATE:</strong> {item.palate}
            </li>
          )}
          {item.finish && (
            <li>
              <strong>FINISH:</strong> {item.finish}
            </li>
          )}
          {item.abv && (
            <li>
              <strong>도수:</strong> {item.abv}
            </li>
          )}
          {item.volume && (
            <li>
              <strong>용량:</strong> {item.volume}
            </li>
          )}
          <li>
            <strong>가격:</strong> {item.price.toLocaleString()}원
          </li>
        </ul>
      </section>
    </main>
  );
}
