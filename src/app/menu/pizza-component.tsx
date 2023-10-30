"use client";
import { useEffect, useState } from "react";
import { useStore, Pizza, PizzaSize,  Topping, getDefaultPizza } from "./store";
import { PizzaSizeSelector } from "./pizza-size-selector";
import { PizzaToppingSelector } from "./pizza-topping";


export function PizzaStoreDebug() {
  const store = useStore(store => store.pizzas);
  return (
    <>
    <pre>{JSON.stringify(store, null, 4)}</pre>
    <pre>{JSON.stringify(getDefaultPizza(), null, 4)}</pre>
    </>
  )
}

function PizzaEditComponent({ pizza }: { pizza?: Pizza }) {


  const currentEditPizza = useStore((state) => state.currentEditPizza);
  const setCurrentEditPizza = useStore((state) => state.setCurrentEditPizza);
  // const [tempPizza, setTempPizza] = useState<Pizza | undefined>(pizza);
  const setPizza = useStore((state) => state.setPizza);

  useEffect(() => {
    setCurrentEditPizza(pizza);
  }, [pizza]);

  if (!currentEditPizza) {
    return null;
  }

  const handleSizeChange = (size: PizzaSize) => {
    setCurrentEditPizza({ ...currentEditPizza, size })
  }

  const handleToppingChange = (toppings: Topping[]) => {
    setCurrentEditPizza({ ...currentEditPizza, toppings })
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPizza(currentEditPizza);
    setCurrentEditPizza(undefined);
    // setCurrentEditPizza(undefined);
  };


  const handleCancelPizza = () => {
    setCurrentEditPizza(undefined);
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-4 space-x-4">
      <div className="flex flex-col">
        <span className="text-lg font-bold">Size:</span>
        <PizzaSizeSelector onChange={handleSizeChange} defaultValue={currentEditPizza.size} />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold">Toppings:</span>
        <PizzaToppingSelector onChange={handleToppingChange} defaultValue={currentEditPizza.toppings} />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Save
      </button>

      <button
        onClick={handleCancelPizza}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
      >
        Cancel
      </button>
    </form>
  );
}
export function PizzasComponent() {
  const pizzas = useStore((state) => state.pizzas);
  const removePizza = useStore((state) => state.removePizza);

  const currentEditPizza = useStore((state) => state.currentEditPizza);
  const setCurrentEditPizza = useStore((state) => state.setCurrentEditPizza);

  const handleEditPizza = (pizza: Pizza) => {
    setCurrentEditPizza(pizza);
  }

  const handleRemovePizza = (pizza: Pizza) => {
    const pizzaId = pizza.id;
    if (pizzaId == null) {
      console.error("Pizza id is null", pizza)
      return
    }
    removePizza(pizzaId);
  }

  return (
    <ul className="list-disc list-inside">
      {pizzas.map((pizza) => (
        <li key={pizza.id} className="mb-2">

          <span className="font-semibold">{pizza.size}</span> - {pizza.toppings.map(t => t.name).join(", ")}
          <button
            onClick={() => handleEditPizza(pizza)}
            className="ml-4 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => handleRemovePizza(pizza)}
            className="ml-4 px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-700"
            >
            Delete
            </button>
          {currentEditPizza && currentEditPizza.id == pizza.id && <PizzaEditComponent pizza={currentEditPizza} />}
        

        </li>
      ))}
    </ul>
  )

}
export function OrderComponent() {
  // const [currentEditPizza, setCurrentEditPizza] = useState<Pizza | undefined>(undefined)
  const currentEditPizza = useStore((state) => state.currentEditPizza);
  const setCurrentEditPizza = useStore((state) => state.setCurrentEditPizza);

  const handleAddPizza = () => {
    setCurrentEditPizza(getDefaultPizza());
  }

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Pizzas</h2>
      <PizzasComponent />
      {currentEditPizza && !currentEditPizza.id && <PizzaEditComponent pizza={currentEditPizza} />}
      <div className="mt-4">
        <button
          onClick={handleAddPizza}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 mr-2"
        >
          Add Pizza
        </button>

      </div>
    </div>
  );
}