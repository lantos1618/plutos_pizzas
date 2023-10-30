import { api } from "~/trpc/server";
import { OrderComponent } from "./OrderComponent";
import { useStore } from "./store";
import { OrderAllergies } from "./OrderAllergies";
import { OrderNotes } from "./OrderNotes";
import { PizzaStoreDebug } from "./PizzaComponent";

export default function Menu() {
    return ( <main className="p-8 bg-white rounded-lg shadow-lg">
        <OrderComponent />
        <OrderAllergies />
        <OrderNotes />
        <PizzaStoreDebug />
    </main> 
    )
}

