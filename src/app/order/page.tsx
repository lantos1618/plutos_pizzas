
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
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
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#18123c] to-[#000000] text-white">
            <AppBar session={session} />
            {orderId && order ? (
                <>
                    <h1 className="text-4xl font-bold">Thank You For Your Order!</h1>
                    <div className="text-lg mt-4">
                        <p><strong>Order ID:</strong> {orderId}</p>
                        {/* <p><strong>Customer ID:</strong> {order.customerId}</p> */}
                        <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
                        <p><strong>Order Status:</strong> {order.orderStatus}</p>
                        {order.notes && <p><strong>Notes:</strong> {order.notes}</p>}
                        <h2 className="text-2xl font-bold mt-4">Pizzas</h2>
                        <ul className="flex flex-col gap-4 mt-2">
                            {order.pizzas.map((pizza, index) => (
                                <li key={index}>
                                    {/* <p><strong>ID:</strong> {pizza.id}</p> */}
                                    <p><strong>Size:</strong> {pizza.size}</p>
                                    <p><strong>Toppings:</strong> {pizza.toppings.join(', ')}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <>
                    <h1 className="text-4xl font-bold">Order</h1>
                    <p className="text-2xl mt-4">No order found</p>
                    <Link href="/#order">
                        <a className="text-blue-400 hover:underline">Go back to order</a>
                    </Link>
                </>
            )}
        </main>
    );
}
