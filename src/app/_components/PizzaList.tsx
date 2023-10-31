import { type Pizza, usePizzaStore } from "../pizzaStore";

export function ClearIcon({ onClick }: { onClick: () => void }) {
    return (
        <svg onClick={onClick} width={24} height={24} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ClearIcon"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
    )
}

export function PizzaListItem({ pizza, index }: { pizza: Pizza, index: number }) {
    const currentPizza = usePizzaStore((state) => state.currentPizza);
    const selectPizza = usePizzaStore((state) => state.selectPizza);
    const removePizza = usePizzaStore((state) => state.removePizza); // Add this line

    const handleSelectPizza = () => {
        selectPizza(pizza);
    }

    const handleRemovePizza = () => { // Add this function
        removePizza(pizza);
    }
    const highlighted = "bg-blue-100";

    return (
        <div onClick={handleSelectPizza} className={
            "flex flex-col border min-w-[200px] rounded-lg shadow-md cursor-pointer hover:bg-blue-300 p-2 " +
            (currentPizza?.id === pizza.id ? highlighted : "")
        }>
            <div className="flex gap-4 justify-between">
                <div className="text-lg font-bold">{index}. {pizza.size}</div>
                <ClearIcon onClick={handleRemovePizza} />
            </div>
            <div className='space-x-4 mt-2 flex-grow'>
                {pizza.toppings.map((topping, index) => (
                    <span key={index} className="text-sm text-gray-500">{topping.name}</span>
                ))}
                {pizza.toppings.length === 0 && <span className="text-sm text-red-500">No toppings</span>}

            </div>
        </div>
    );
}

export function PizzaList() {
    const pizzas = usePizzaStore((state) => state.pizzas);
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Your pizzas</h2>
            <div className="flex flex-row items-center flex-wrap gap-4">
                {pizzas.map((pizza, index) => (
                    <PizzaListItem key={index} index={index + 1} pizza={pizza} />
                ))}
            </div>
        </div>
    );
}
