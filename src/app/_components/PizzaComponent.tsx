"use client";

import { useRouter } from "next/navigation";
import { type Address, usePizzaStore } from "../pizzaStore";
import { PizzaList } from "./PizzaList";
import { PizzaSizeSelector } from "./PizzaSizeSelector";
import { PizzaToppingsSelector } from "./PizzaToppingSelector";
import Link from "next/link";
import { useState } from "react";
import { type Session } from "next-auth";
import { api } from "~/trpc/react";


export function OrderArrow() {
  const navigate = useRouter();
  return (
    <div
      className="relative z-6 flex flex-col items-center cursor-pointer gap-2  transition-colors duration-100 text-white fill-white hover:text-blue-500 hover:fill-blue-500"
      onClick={() => {
        // navigate to order section #order
        navigate.push("#order");
      }}
    >
      <Link href="#order" className=" font-bold text-lg">Order</Link>
      <svg width={50} height={50} focusable="false" aria-hidden="true" viewBox="0 0 24 24" ><path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path></svg>
    </div>
  )
}

export function AddNewPizza() {
  const createPizza = usePizzaStore((state) => state.createPizza);

  const handleAddPizza = () => {
    createPizza({ size: "LARGE", toppings: [] });
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



export function Checkout() {

  const pizzas = usePizzaStore((state) => state.pizzas);
  const createOrderMutation = api.pluto.createOrder.useMutation();


  const [address, setAddress] = usePizzaStore((state) => [state.address, state.setAddress]);
  const [notes, setNotes] = usePizzaStore((state) => [state.notes, state.setNotes]);
  const [loading, setLoading] = useState(false);



  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  }



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // validate address
    // validate pizzas

    setLoading(true);
    const tempPizzas = pizzas.map(pizza => (
      {
        size: pizza.size,
        toppings: pizza.toppings.map(topping => topping.name)
      }))
    const result = await createOrderMutation.mutateAsync({
      address: {
        ...address,
      },
      notes,
      pizzas: tempPizzas,

    });
    const orderID = result.id; 
    if (orderID) {
      // redirect(`/order?orderId=${orderID}`);  nextjs navigation not working atm 
      window.location.href = `/order?orderId=${orderID}`;
    }
    // setLoading(false);
};
return (
  <div className="p-6 max-w-xl mx-auto bg-white flex flex-col items-center gap-4 overflow-auto">
    <form onSubmit={handleSubmit} className="w-full p-2" >
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Delivery Details</h2>
        <p>Where should we deliver your pizza?</p>
        <div className="flex flex-row gap-6">
          <div className="flex flex-col w-1/2">
            {(Object.keys(address) as Array<keyof Address>).map((field) =>
              <label className="flex flex-col mb-4" key={field}>
                <span className="text-gray-500 font-bold mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </span>
                <input
                  className="bg-gray-200 border-2 border-gray-200 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  name={field}
                  value={address[field]}
                  onChange={handleChange}
                />
              </label>
            )
            }
          </div>
          <div className="flex flex-col w-1/2">
            <h2 className="text-xl font-bold mb-2">Notes</h2>
            <p className="mb-4">Any notes or allergies?</p>
            <textarea
              className="w-full p-2 border-2 border-gray-200 rounded resize-y"
              value={notes}
              onChange={handleNotesChange}
            />
          </div>
        </div>
        <div className="flex items-center justify-center mt-6">
          <button
            className={"bg-blue-500 hover:bg-blue-700 focus:bg-blue-800 focus:outline-none active:bg-blue-900 text-white font-bold py-2 px-4 rounded " +
              (loading ?? "" )
          }
            type="submit"
            disabled={loading}
            >
            Checkout {loading && <span className="animate-ping">🍕</span>}
          </button>
        </div>
      </div>
    </form>
  </div>
);

}

export function OrderComponent({ session }: { session: Session | null }) {
  const [checkout, toggleCheckout] = usePizzaStore((state) => [state.checkout, state.toggleCheckout]);

  const handleCheckout = () => {
    toggleCheckout();
  }
  return (
    <div className='flex flex-col p-10 gap-4'>
      <h1 className="text-4xl font-bold">Order</h1>

      {
        session ?
          <>
            <PizzaList />
            <div className="flex flex-row gap-4 items-center">
              <AddNewPizza />
              <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={handleCheckout}>Show Checkout</button>
            </div>
            {
              checkout ?
                <Checkout /> :
                <PizzaEditor />
            }
          </>
          : <>
            <h2 className="text-2xl font-bold">Sign in to order</h2>
            <Link className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" href="/api/auth/signin">Sign in</Link>
          </>
      }
    </div>
  );
}