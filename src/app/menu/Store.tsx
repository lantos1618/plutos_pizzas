import { create } from "zustand";


export enum PizzaSize {
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE",
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
        category: ToppingCategory.VEGETABLE,
        name: "olives",
        image: "https://media.discordapp.net/attachments/1115663218048774277/1168223224467837088/lantos_1618_dieced_olives_dark_86c35e48-4d92-48de-8229-4f9c3328a3d2.png"
    },
]


const DefaultPizza = {
    id: undefined,
    size: PizzaSize.SMALL,
    toppings: [],
} 

export function getDefaultPizza(): Pizza {
    return {...DefaultPizza}
}

export const PizzaTable = {
    SMALL: {
        sizeInch: 10,
        freeToppings: 2,
        price: 6.99,
    },
    MEDIUM: {
        sizeInch: 12,
        freeToppings: 3,
        price: 8.99,
    },
    LARGE: {
        sizeInch: 14,
        freeToppings: 5,
        price: 11.99,
    },
} as const


export const ExtraToppingPrice = 1.49

export function calcPizzaPrice(pizza: Pizza) {
    // this is a dumb pricing function,
    //  we would ideally use Data Model in a more complicated system
    // but this is actually sufficient for the demo
    const { size, toppings } = pizza
    const toppingsCount = toppings.length
    const {price, freeToppings } = PizzaTable[size]
    const extraToppingsAmount = Math.max(0, toppingsCount - freeToppings)
    const extraToppingsPrice = extraToppingsAmount * ExtraToppingPrice
    const totalPrice = price + extraToppingsPrice
    return totalPrice
}

export type Pizza = {
    id?: string;
    size: PizzaSize;
    toppings: Topping[];
};



type Store = {
    pizzas: Pizza[];
    notes?: string;
    allergies?: string;
    currentEditPizza?: Pizza;
    // // currentEditPizza == Undefined means we are not editing any pizza
    // // currentEditPizza.id == null means we are adding this pizza
    // // currentEditPizza.id != null means we are editing this pizza
    setCurrentEditPizza: (pizza?: Pizza) => void;
    setPizza: (pizza: Pizza) => void;
    removePizza: (pizzaId: string) => void;
    clearCart: () => void;
    setNotes: (notes?: string) => void;
    setAllergies: (allergies?: string) => void;
}

export const useStore = create<Store>((set, get) => ({
    pizzas: [],
    currentEditPizza: undefined,
    setCurrentEditPizza: (pizza?: Pizza) => {
        set((state) => ({ ...state, currentEditPizza: pizza }));
    },
    setPizza: (pizza: Pizza) => {
        if (pizza.toppings == null) {
            console.error("Nill Pizza", pizza)
            return
        }
        if (pizza.size == null) {
            console.error("Nill Pizza", pizza)
            return
        }

        if (!pizza.id) {
            pizza.id = Math.random().toString(36).substring(2, 11);
            set((state) => ({ ...state, pizzas: [...state.pizzas, pizza] }));
            return
        }

        const pizzas = [...get().pizzas] // need to deep copy the array
        const pizzaIndex = pizzas.findIndex(p => p.id === pizza.id)
        if (pizzaIndex === -1) {
            console.error("Pizza not found in store", pizza)
            return
        }
        pizzas[pizzaIndex] = pizza
        set((state) => ({ ...state, pizzas }));
    },
    removePizza: (pizzaId: string) => {
        const pizzas = [...get().pizzas].filter(p => p.id !== pizzaId)
    
        set((state) => ({ ...state, pizzas }));
    },
   
    clearCart: () => {
        set((state) => ({ ...state, pizzas: [] }));
    },
    setNotes: (notes?: string) => {
        set((state) => ({ ...state, notes }));
    },
    setAllergies: (allergies?: string) => {
        set((state) => ({ ...state, allergies }));
    },
}));