"use client";

import { type Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/router"; // Changed from "next/navigation"

import { api } from "~/trpc/react";
import { RouterInputs, type RouterOutputs } from "~/trpc/shared";

type Order = RouterOutputs['pluto']['getOrders'][0]

export function AdminOrderRowComponent({order}: {order: Order}){
    return (
        <tr className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-2 px-4">{order.id}</td>
            <td className="py-2 px-4">{order.customer.name}</td>
            <td className="py-2 px-4">{order.paymentStatus}</td>
            <td className="py-2 px-4">{order.orderStatus}</td>
            <td className="py-2 px-4">{order.notes}</td>
            <td className="py-2 px-4">
                <ul>
                    {order.pizzas.map((pizza, index) => (
                        <li key={index} className="list-inside list-disc">
                            <p><strong>Size:</strong> {pizza.size}</p>
                            <p><strong>Toppings:</strong> {pizza.toppings.join(', ')}</p>
                        </li>
                    ))}
                </ul>
            </td>
            <td className="py-2 px-4">
                <button className="bg-red-500 text-white px-2 py-1 mr-1">Cancel Order</button>
                <button className="bg-yellow-500 text-white px-2 py-1 mr-1">Prepare Order</button>
                <button className="bg-blue-500 text-white px-2 py-1 mr-1">Out for Delivery</button>
                <button className="bg-green-500 text-white px-2 py-1 mr-1">Delivered</button>
                <button className="bg-gray-500 text-white px-2 py-1">Refund Order</button>
            </td>
        </tr>
    )
}

export function AdminOrderComponent({session}: {session: Session | null}){

    if(!session){
        return <div className="bg-red-100 p-4 rounded-md"> 
            <h1 className="text-red-600 font-bold">You are not authorized to view this page</h1>
            <p className="text-red-500">Please sign in as an Authorized User to view this page</p>
            <Link href="/api/auth/signin" className="text-blue-500 underline">Sign in</Link>
        </div>
    }

    const orders = api.pluto.getOrders.useQuery();
    
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Orders</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 text-black" >
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border">Order ID</th>
                            <th className="py-2 px-4 border">Customer ID</th>
                            <th className="py-2 px-4 border">Payment Status</th>
                            <th className="py-2 px-4 border">Order Status</th>
                            <th className="py-2 px-4 border">Notes</th>
                            <th className="py-2 px-4 border">Pizzas</th>
                            <th className="py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.data?.map((order, index) => (
                            <AdminOrderRowComponent key={index} order={order} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
