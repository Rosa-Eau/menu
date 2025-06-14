// app/admin/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminDashboardUI from "./AdminDashboardUI";

export default async function AdminDashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/admin/login");
    }

    return <AdminDashboardUI />;
}
