
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import { AppBar } from "../_components/AppBar";
import { AdminOrderComponent } from "../_components/AdminComponents";

export default async function Home() {
    const session = await getServerAuthSession();


    if (!session) {
        // route to login
        redirect("/api/auth/signin");
        return null;
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#18123c] to-[#000000] text-white">
            <AppBar session={session} />
            <AdminOrderComponent session={session} />
        </main>
    );
}
