import { api } from "~/trpc/server";
import {OrderComponent, PizzaStoreDebug}  from "./pizza-component";
import { useStore } from "./store";
import { OrderAllergies } from "./order-allergies";
import { OrderNotes } from "./order-notes";

export default function Menu() {
    return ( <main className="p-8 bg-white rounded-lg shadow-lg">
        <OrderComponent />
        <OrderAllergies />
        <OrderNotes />
        <PizzaStoreDebug />
    </main> 
    )
}

