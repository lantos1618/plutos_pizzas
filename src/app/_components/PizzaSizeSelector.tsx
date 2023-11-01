"use client";


import { api } from "~/trpc/react";
import { type _PizzaSize, _PizzaTable, usePizzaStore } from "../pizzaStore";



export function SmallPizza() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32" focusable="false" aria-hidden="false" aria-label="Small 9.5&quot;" > <path d="M19.003 20.497a1 1 0 110 2 1 1 0 110-2zM16.2 25.703a9.716 9.716 0 008.116-4.678L16.2 16.347v9.356zM22.506 17a1 1 0 110-2 1 1 0 110 2zm2.01-5.678L16.4 16l8.116 4.678c.766-1.387 1.203-2.981 1.203-4.678s-.438-3.291-1.203-4.678zM12.997 9.503a1 1 0 110 2 1 1 0 110-2zm-5.313 1.472l8.116 4.678V6.297a9.716 9.716 0 00-8.116 4.678zm11.319.528a1 1 0 110-2 1 1 0 110 2zM16.2 6.297v9.356l8.116-4.678A9.716 9.716 0 0016.2 6.297zM9.494 17a1 1 0 110-2 1 1 0 110 2zm-2.01-5.678C6.718 12.709 6.281 14.303 6.281 16s.438 3.291 1.203 4.678L15.6 16l-8.116-4.678zm5.513 9.175a1 1 0 110 2 1 1 0 110-2zm2.803 5.206v-9.356l-8.116 4.678a9.716 9.716 0 008.116 4.678z"></path></svg>
}

export function MediumPizza() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32" focusable="false" aria-hidden="false" aria-label="Medium 11.5&quot;" ><path d="M12.75 7.878a1 1 0 11.744 1.857 1 1 0 01-.744-1.857zm3.05 7.641V5.078a10.878 10.878 0 00-7.381 3.056l7.381 7.384zm7.716 2.612a1 1 0 11-.79 1.839 1 1 0 01.79-1.839zm.35 5.45a10.882 10.882 0 003.056-7.381H16.481l7.384 7.381zm-5.357-1.315a1 1 0 11.744 1.857 1 1 0 01-.744-1.857zM16.2 26.922a10.878 10.878 0 007.381-3.056L16.2 16.482v10.441zm6.622-14.731a1 1 0 11.744 1.857 1 1 0 01-.744-1.857zm4.1 3.609a10.878 10.878 0 00-3.056-7.381L16.482 15.8h10.441zm-8.266-6.003a1 1 0 11.79-1.839 1 1 0 01-.79 1.839zM16.2 5.078v10.441l7.381-7.381A10.87 10.87 0 0016.2 5.079zm-2.856 17.125a1 1 0 11-.79 1.839 1 1 0 01.79-1.839zm2.456 4.719V16.481l-7.381 7.384a10.882 10.882 0 007.381 3.056zm-6.622-7.113a1 1 0 11-.744-1.857 1 1 0 01.744 1.857zm-4.1-3.609a10.878 10.878 0 003.056 7.381l7.381-7.381H5.077zm3.406-2.331a1 1 0 11.79-1.839 1 1 0 01-.79 1.839zm-.35-5.45A10.882 10.882 0 005.078 15.8h10.441L8.135 8.419z"></path></svg>
}

export function LargePizza() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32" focusable="false" aria-hidden="false" aria-label="Large 13.5&quot;" ><path d="M12.909 6.487a.996.996 0 011.259.644.996.996 0 01-.641 1.259.996.996 0 01-1.259-.644.996.996 0 01.641-1.259zm2.891 8.897V3.859c-2.519.041-4.85.847-6.775 2.2l6.775 9.325zm8.069 5.097a1 1 0 11-1.174 1.619 1 1 0 011.174-1.619zm-.572 5.225a12.16 12.16 0 004.188-5.762l-10.962-3.563 6.775 9.325zM25 17a1 1 0 110-2 1 1 0 110 2zm2.609-4.562l-10.962 3.563 10.962 3.563a12.224 12.224 0 000-7.126zm-9.137 11.171a.996.996 0 011.259.644.999.999 0 11-1.9.615 1 1 0 01.641-1.259zM16.2 28.141a12.082 12.082 0 006.775-2.2L16.2 16.616v11.525zm2.272-19.75c-.525-.172-.813-.734-.641-1.259s.734-.813 1.259-.644a1 1 0 01-.618 1.903zM16.2 3.859v11.525l6.775-9.325a12.082 12.082 0 00-6.775-2.2zm-8.069 7.66A1 1 0 119.305 9.9a1 1 0 01-1.174 1.619zm.572-5.225a12.157 12.157 0 00-4.188 5.763l10.963 3.563-6.775-9.325zm4.825 17.315c.525.172.813.734.641 1.259s-.734.813-1.259.644c-.525-.172-.813-.734-.641-1.259s.734-.813 1.259-.644zm2.272 4.532V16.616l-6.775 9.325a12.082 12.082 0 006.775 2.2zM22.694 9.9a1 1 0 111.175 1.618A1 1 0 0122.694 9.9zm4.79 2.156a12.177 12.177 0 00-4.188-5.763l-6.772 9.325 10.959-3.563zM7 17a1 1 0 110-2 1 1 0 110 2zm-2.609-4.562a12.224 12.224 0 000 7.126l10.963-3.563-10.963-3.563zM9.306 22.1a1 1 0 11-1.175-1.618A1 1 0 019.306 22.1zm-4.79-2.156a12.17 12.17 0 004.188 5.762l6.772-9.325-10.959 3.563z"></path> </svg>
}


type PizzaSizeLabelProps = {
    sizeInch: number,
    freeToppings: number,
    price: number
}

export function PizzaSizeLabel({ sizeInch, freeToppings, price }: PizzaSizeLabelProps) {
    return (
        <div className="p-2 text-center ">
            {sizeInch}&quot;<br />
            {freeToppings} Toppings included<br/>
            £{price}<br />
        </div>
    )
}

export function PizzaSizeSelector() {
    const currentPizza = usePizzaStore((state) => state.currentPizza);
    const updatePizza = usePizzaStore((state) => state.updatePizza);

    const handleSizeClick = (size: _PizzaSize) => {
        if (!currentPizza) { return }
        const updatedPizza = { ...currentPizza, size };
        updatePizza(updatedPizza);
    }

    const highlighted = "text-blue-700 fill-orange-400"
    const unhighlighted = "text-black fill-black"

    return <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Size</h2>
        <div className='flex flex-row items-center self-center gap-4'>
            <div
                className={"flex flex-col cursor-pointer " +
                    (currentPizza?.size === "SMALL" ? highlighted : unhighlighted)
                }
                onClick={() => handleSizeClick("SMALL")}
            >
                <SmallPizza />
                <PizzaSizeLabel {..._PizzaTable.SMALL} />
            </div>
            <div
                className={"flex flex-col cursor-pointer " +
                    (currentPizza?.size === "MEDIUM" ? highlighted : unhighlighted)
                }
                onClick={() => handleSizeClick("MEDIUM")}>
                <MediumPizza />
                <PizzaSizeLabel {..._PizzaTable.MEDIUM} />
            </div>
            <div
                className={"flex flex-col cursor-pointer " +
                    (currentPizza?.size === "LARGE" ? highlighted : unhighlighted)
                }
                onClick={() => handleSizeClick("LARGE")}>
                <LargePizza />
                <PizzaSizeLabel {..._PizzaTable.LARGE} />
            </div>
        </div>
    </div>;
}

