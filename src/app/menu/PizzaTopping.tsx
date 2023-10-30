"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ToppingsTable, type Topping } from "./store";



export function PizzaToppingSelector({ onChange, defaultValue }: { onChange: (toppings: Topping[]) => void, defaultValue?: Topping[]}) {
    const [pizzaToppings, setPizzaToppings] = useState<Topping[]>(defaultValue ?? []);

    const handleToppingClick = (topping: Topping) => {
        // toggle topping from pizzaToppings
        if (pizzaToppings.includes(topping)) {
            setPizzaToppings(pizzaToppings.filter(t => t !== topping))
            return
        }
        setPizzaToppings([...pizzaToppings, topping])

    }

    useEffect(() => {
        onChange(pizzaToppings)
    }, [onChange, pizzaToppings])
       
    return (
        <div className="grid grid-cols-3 gap-4">
            {ToppingsTable.map((topping, index) => (
                <div
                    key={index}
                    className={
                        "flex flex-col items-center cursor-pointer p-4 border border-gray-300 rounded-lg" + 
                        (pizzaToppings.includes(topping) ? " bg-blue-100" : "")
                    }
                    onClick={() => handleToppingClick(topping)}
                >
                    <Image src={topping.image} alt={topping.name} width={100} height={100} />
                    <span className="mt-2 text-lg">{topping.name}</span>
                </div>
            ))}
        </div>
    );
};