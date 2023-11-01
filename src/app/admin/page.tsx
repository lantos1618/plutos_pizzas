
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import { ToppingsTableComponent } from "../_components/AdminToppings";

export default async function Home() {
    const session = await getServerAuthSession();


    if (!session) {
        // route to login
        redirect("/api/auth/signin");
        return null;
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#525252] to-[#000000] text-white">
            <ToppingsTableComponent />
        </main>
    );
}