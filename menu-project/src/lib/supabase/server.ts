import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createSupabaseServerClient = async () => {
    const cookieStore = await cookies(); // ✅ 이제는 await 필요함 (Next.js 15 기준)

    return createServerClient (
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get: async (name: string) => cookieStore.get(name)?.value,
                set: () => { },
                remove: () => { },
            },
        }
    );
};
