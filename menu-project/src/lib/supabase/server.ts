import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { SupabaseClient } from '@supabase/supabase-js';

export const createSupabaseServerClient = (): SupabaseClient => {
    const cookieStore = cookies();
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll: async () => {
                    const store = await cookies();
                    // Convert cookies to the expected format: { name, value }
                    return store.getAll().map((cookie: any) => ({
                        name: cookie.name,
                        value: cookie.value,
                    }));
                },
            },
        }
    );
};