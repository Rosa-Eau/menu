// app/menu/page.tsx
import { createSupabaseServerClient } from '@/lib/supabase/server';
import MenuPageClient from './MenuPageClient';

export default async function MenuPage() {
  const supabase = await createSupabaseServerClient();
  const { data: menuItems } = await supabase
    .from('menu')
    .select('id, title, description, price, category'); // category 꼭 포함!

  return <MenuPageClient menuItems={menuItems ?? []} />;
}
