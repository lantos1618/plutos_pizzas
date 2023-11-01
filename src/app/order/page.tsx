
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { ToppingsTableComponent } from "../_components/AdminToppings";
import { AppBar } from "../_components/AppBar";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Order({
    searchParams,
}: {
    searchParams: {
        orderId: string;
    }
}) {
    const session = await getServerAuthSession();
    // get the orderId from the query params
    // get the order from the database


    const tempOrderId = searchParams.orderId;
    // cast the orderId to a number
    const orderId = tempOrderId ? parseInt(tempOrderId) : null;

    if (!orderId) {
        return <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#525252] to-[#000000] text-white">
            <AppBar session={session} />
            <h1 className="text-4xl font-bold">Order</h1>
            <p className="text-2xl font-bold">No order found</p>
            <Link href="/#order">Go back to order</Link>
        </main>
    }
    const order = await api.pluto.getOrder.query({ orderId: orderId })

    if (!session) {
        // route to login
        redirect("/api/auth/signin");
        return null;
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#525252] to-[#000000] text-white">
            {JSON.stringify(order, null, 2)}
        </main>
    );
}
