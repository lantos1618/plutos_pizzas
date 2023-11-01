"use client";

import { useState } from 'react';
import { type Session } from "next-auth";
import Link from "next/link";

import { api } from "~/trpc/react";
import { type RouterOutputs } from "~/trpc/shared";
import { OrderStatus } from '~/.prisma/client';

type Order = RouterOutputs['pluto']['getOrders'][0]

export function AdminOrderRowComponent({ order, setSelectedOrder, highlighted }: { order: Order, setSelectedOrder: (order: Order) => void, highlighted: boolean }) {

    return (
        <tr
            className={
                "border-b border-gray-200 cursor-pointer " +
                (highlighted ? " bg-blue-200" : "")
            }
            onClick={() => setSelectedOrder(order)}
        >
            <td className="py-2 px-4 ">{order.id}</td>
            <td className="py-2 px-4">
                {order.customer.name} <br />
                {order.address.street} <br />
                {order.address.city} <br />
                {order.address.zip} <br />
            </td>
            <td className="py-2 px-4">{order.paymentStatus}</td>
            <td className="py-2 px-4">{order.orderStatus}</td>
            <td className="py-2 px-4">{order.notes}</td>
            <td className="py-2 px-4">
                <ul>
                    {order.pizzas.map((pizza, index) => (
                        <li key={index} className="list-inside">
                            <p><strong>{pizza.size}</strong> - {pizza.toppings.join(', ')}</p>
                        </li>
                    ))}
                </ul>
            </td>
        </tr>
    )
}

export function AdminOrderActionsComponent({ order }: { order: Order | null }) {

    const updateOrderMutation = api.pluto.updateOrder.useMutation();


    const handleUpdateOrder = (
        { orderId, orderStatus, paymentStatus }: { orderId: string, orderStatus?: Order["orderStatus"], paymentStatus?: Order["paymentStatus"] }
    ) => {

        updateOrderMutation.mutate({
            orderId,
            orderStatus,
            paymentStatus
        }, 
       )
    }

    if (!order) {
        return null;
    }

    return (

        <div className="action-list p-2">
            <h2 className="text-lg font-bold mb-2">Actions for Order {order?.id}</h2>
            <button
                className="bg-red-500 text-white px-2 py-1 mr-1"
                onClick={() => handleUpdateOrder({
                    orderId: order.id,
                    orderStatus: "CANCELLED",
                    paymentStatus: "CANCELLED"
                })}


            >Cancel Order</button>
            <button
                className="bg-yellow-500 text-white px-2 py-1 mr-1"
                onClick={() =>
                    handleUpdateOrder({
                        orderId: order.id,
                        orderStatus: "PREPARATION"
                    })
                } 
            >Prepare Order</button>
            <button 
            className="bg-blue-500 text-white px-2 py-1 mr-1"
            onClick={() =>
                handleUpdateOrder({
                    orderId: order.id,
                    orderStatus: "DELIVERY"
                })
            }
            >Out for Delivery</button>
            <button className="bg-green-500 text-white px-2 py-1 mr-1"
            onClick={() =>
                handleUpdateOrder({
                    orderId: order.id,
                    orderStatus: "DELIVERED",
                    paymentStatus: "PAID"
                })
            }
            >Delivered</button>
            <button className="bg-gray-500 text-white px-2 py-1"
            onClick={() =>
                handleUpdateOrder({
                    orderId: order.id,
                    paymentStatus: "REFUNDED"
                })
            }
            >Refund Order</button>
        </div>
    )
}

export function AdminOrderComponent({ session }: { session: Session | null }) {

    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const orders = api.pluto.getOrders.useQuery();

    if (!session) {
        return (
            <div className="bg-red-100 p-4 rounded-md">
                <h1 className="text-red-600 font-bold">You are not authorized to view this page</h1>
                <p className="text-red-500">Please sign in as an Authorized User to view this page</p>
                <Link href="/api/auth/signin" className="text-blue-500 underline">Sign in</Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Orders</h1>
            <AdminOrderActionsComponent order={selectedOrder} />
            <div className="overflow-x-auto mb-4">
                <table className="min-w-full bg-white border border-gray-300 text-black">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border ">Order ID</th>
                            <th className="py-2 px-4 border">Customer ID</th>
                            <th className="py-2 px-4 border">Payment Status</th>
                            <th className="py-2 px-4 border">Order Status</th>
                            <th className="py-2 px-4 border">Notes</th>
                            <th className="py-2 px-4 border">Pizzas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.data?.map((order, index) => (
                            <AdminOrderRowComponent key={index} order={order} setSelectedOrder={setSelectedOrder} highlighted={selectedOrder?.id === order.id} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}