"use client";
import { PizzasComponent, PizzaEditComponent } from "./PizzaComponent";
import { useStore, getDefaultPizza } from "../store";

export function OrderComponent() {
  // const [currentEditPizza, setCurrentEditPizza] = useState<Pizza | undefined>(undefined)
  const currentEditPizza = useStore((state) => state.currentEditPizza);
  const setCurrentEditPizza = useStore((state) => state.setCurrentEditPizza);

  const handleAddPizza = () => {
    setCurrentEditPizza(getDefaultPizza());
  };

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
