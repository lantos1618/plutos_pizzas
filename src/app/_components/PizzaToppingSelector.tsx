import { type Topping, ToppingsTable, usePizzaStore } from "../pizzaStore";
import Image from 'next/image';


export function PizzaToppingsSelector() {

  const currentPizza = usePizzaStore((state) => state.currentPizza);
  const updatePizza = usePizzaStore((state) => state.updatePizza);


  const handleToppingClick = (topping: Topping) => {
    if (!currentPizza) { return }
    // toggle topping

    // if topping is already on the pizza, remove it
    // if topping is not on the pizza, add it

    const isToppingOnPizza = currentPizza.toppings.some(t => t.name === topping.name);
    const updatedPizza = {
      ...currentPizza,
      toppings: isToppingOnPizza ?
        currentPizza.toppings.filter(t => t.name !== topping.name) :
        [...currentPizza.toppings, topping]
    };
    updatePizza(updatedPizza);


  }

  const highlighted = "text-blue-700 fill-blue-700 border-blue-300 bg-blue-100"

  return (
    <div className='flex flex-col gap-4'>
      <h1 className="text-2xl font-bold">Toppings</h1>
      <div className='flex flex-wrap items-center self-center gap-4'>
        {ToppingsTable.map((topping, index) => (
          <div
            key={index}
            className={
              "border-2 border-gray-300 p-4 rounded-lg cursor-pointer transition-colors duration-100 " +
              (currentPizza?.toppings.some(t => t.name === topping.name) ? highlighted : "")
            }
            onClick={() => handleToppingClick(topping)}
          >
            {(currentPizza?.toppings.some(t => t.name === topping.name))}
            <Image
              src={topping.image}
              alt={topping.name}
              width={150}
              height={150}
            />
            <p className="mt-2 text-center">{topping.name}

            </p>
          </div>
        ))}
      </div>
    </div>
  );
}