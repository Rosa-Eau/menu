// app/admin/dashboard/page.tsx
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AdminDashboardUI from './AdminDashboardUI';

export default async function AdminDashboardPage() {
    const supabase = await createSupabaseServerClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/admin/login');
    }

    return <AdminDashboardUI />;
}
