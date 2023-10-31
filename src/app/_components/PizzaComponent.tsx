"use client";

import { useRouter } from "next/navigation";
import { usePizzaStore } from "../pizzaStore";
import { PizzaList } from "./PizzaList";
import { Checkout, PizzaSizeSelector } from "./PizzaSizeSelector";
import { PizzaToppingsSelector } from "./PizzaToppingSelector";
import Link from "next/link";

export function OrderArrow() {
  const navigate = useRouter();
  return (
    <div
      className="relative z-10 flex flex-col items-center cursor-pointer gap-2  transition-colors duration-100 text-white fill-white hover:text-blue-500 hover:fill-blue-500"
      onClick={() => {
        // navigate to order section #order
        navigate.push("#order");
      }}
    >
      <Link href="#order">Order</Link>
      <svg width={38} height={38} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="KeyboardArrowDownIcon"><path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path></svg>
    </div>
  )
}

export function AddNewPizza() {
  const createPizza = usePizzaStore((state) => state.createPizza);

  const handleAddPizza = () => {
    createPizza({ size: "large", toppings: [] });
  }
  return <button
    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
    onClick={handleAddPizza}>Add new pizza</button>;
}

export function PizzaEditor() {
  const pizza = usePizzaStore((state) => state.currentPizza);

  if (!pizza) {
    return null;
  }

  return (
    <div>
      <PizzaSizeSelector />
      <PizzaToppingsSelector />
    </div>
  );
}

export function OrderComponent() {

  return (
    <div className='flex flex-col p-10 gap-4'>
      <h1 className="text-4xl font-bold">Order</h1>
      <PizzaList />
      <div className="flex flex-row gap-4 items-center">
        <AddNewPizza />
        <Checkout />
      </div>
      <PizzaEditor />
    </div>
  );
}
