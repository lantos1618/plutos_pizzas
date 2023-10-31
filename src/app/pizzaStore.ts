
import { create } from 'zustand'

export type PizzaSize = 'small' | 'medium' | 'large';

export type PizzaDetails = {
  sizeInch: number,
  freeToppings: number,
  price: number,
}

export const PizzaTable: Record<PizzaSize, PizzaDetails> = {
  small: {
    sizeInch: 10,
    freeToppings: 2,
    price: 6.99,
  },
  medium: {
    sizeInch: 12,
    freeToppings: 3,
    price: 8.99,
  },
  large: {
    sizeInch: 14,
    freeToppings: 5,
    price: 11.99,
  },
}

export const ExtraToppingPrice = 1.49

export function calcPizzaPrice(pizza: Pizza) {
  // this is a dumb pricing function,
  //  we would ideally use Data Model in a more complicated system
  // but this is actually sufficient for the demo
  if (pizza.size == null) {
    console.error("Nill Pizza, no size", pizza)
    return 0
  }
  if (pizza.toppings == null) {
    console.error("Nill Pizza, no toppings", pizza)
    return 0
  }

  const { size, toppings } = pizza
  const toppingsCount = toppings.length
  const { price, freeToppings } = PizzaTable[size]
  const extraToppingsAmount = Math.max(0, toppingsCount - freeToppings)
  const extraToppingsPrice = extraToppingsAmount * ExtraToppingPrice
  const totalPrice = price + extraToppingsPrice
  return totalPrice
}

export enum ToppingCategory {
  MEAT = "Meat",
  VEGETABLE = "Vegetable",
  CHEESE = "Cheese"
}

export type Topping = {
  category: ToppingCategory,
  name: string,
  image: string
}


export const ToppingsTable: Topping[] = [
  {
    category: ToppingCategory.MEAT,
    name: "Pepperoni",
    image: "https://media.discordapp.net/attachments/1115663218048774277/1168222289607786536/lantos_1618_salami_pepperoni_429881e1-a7f6-442d-b392-11c84b8aab87.png"
  },
  {
    category: ToppingCategory.MEAT,
    name: "ham",
    image: "https://media.discordapp.net/attachments/1115663218048774277/1168240555302596719/lantos_1618_sliced_ham_8634711b-4c6f-465c-b31e-52b9f1ee2046.png"
  },
  {
    category: ToppingCategory.MEAT,
    name: "chicken",
    image: "https://media.discordapp.net/attachments/1115663218048774277/1168901354006265937/lantos_1618_cut_pulled_chicken__for_ingredents_9427bfe5-1185-4ad2-9ef6-981027208615.png"
  },
  {
    category: ToppingCategory.VEGETABLE,
    name: "olives",
    image: "https://media.discordapp.net/attachments/1115663218048774277/1168223224467837088/lantos_1618_dieced_olives_dark_86c35e48-4d92-48de-8229-4f9c3328a3d2.png"
  },
  {
    category: ToppingCategory.VEGETABLE,
    name: "mushrooms",
    image: "https://media.discordapp.net/attachments/1115663218048774277/1168899079858827335/lantos_1618_mushrooms_sliced_button_mushrooms_for_pizza_ingrede_6146a688-3752-42e3-8194-db1985ebe17f.png"
  },
  {
    category: ToppingCategory.VEGETABLE,
    name: "rocket",
    image: "https://cdn.discordapp.com/attachments/1115663218048774277/1168908527977365504/lantos_1618_arugula_for_ingredients_17fc2bce-9dd0-4444-beea-cd15cd97b3e1.png"

  },
  {
    category: ToppingCategory.CHEESE,
    name: "goats cheese",
    image: "https://media.discordapp.net/attachments/1115663218048774277/1168899847819108443/lantos_1618_goats_cheese_for_pizza_ingredents_74948e05-34ac-40f4-acf3-6b8df21c0319.png"

  },

]

export interface Pizza {
  id?: string;
  size: PizzaSize;
  toppings: Topping[];
}

export interface Store {
  pizzas: Pizza[];
  currentPizza: Pizza | null;
  createPizza: (pizza: Pizza) => void;
  selectPizza: (pizza: Pizza) => void;
  updatePizza: (pizza: Pizza) => void;
  removePizza: (pizza: Pizza) => void;
}

export const usePizzaStore = create<Store>((set, get) => ({
  pizzas: [],
  currentPizza: null,
  selectPizza: (pizza) => set(() => ({ currentPizza: pizza })),
  createPizza: (pizza) => {
    pizza.id = Math.random().toString(36).substring(2, 9);
    set((state) => ({ pizzas: [...state.pizzas, pizza], currentPizza: pizza }))
  },
  updatePizza: (pizza) => {
    set((state) => ({
      pizzas: state.pizzas.map((p) => p.id === pizza.id ? pizza : p),
      currentPizza: pizza
    }));

  },
  removePizza: (pizza) => {
    set((state) => ({
      pizzas: state.pizzas.filter((p) => p.id !== pizza.id),
    }));
  }
}));

// import { persist } from 'zustand/middleware'

// export const usePizzaStore = create(
//   persist<Store>(
//     (set, get) => ({
//       pizzas: [],
//       currentPizza: null,
//       selectPizza: (pizza) => set(() => ({ currentPizza: pizza })),
//       createPizza: (pizza) => {
//         pizza.id = Math.random().toString(36).substring(2, 9);
//         set((state) => ({ pizzas: [...state.pizzas, pizza], currentPizza: pizza }))
//       },
//       updatePizza: (pizza) => {
//         set((state) => ({
//           pizzas: state.pizzas.map((p) => p.id === pizza.id ? pizza : p),
//           currentPizza: pizza
//         }));
//       },
//       removePizza: (pizza) => {
//         set((state) => ({
//           pizzas: state.pizzas.filter((p) => p.id !== pizza.id),
//         }));
//       }
//     }),
//     {
//       name: 'pizza-store', // unique name
//       getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
//     }
//   )
// );