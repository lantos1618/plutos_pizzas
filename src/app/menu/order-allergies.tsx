"use client";

import { useStore } from "./store";

export function OrderAllergies() {
    const allergies = useStore((state) => state.allergies);
    const setAllergies = useStore((state) => state.setAllergies);
    
    return (
        <div className="flex flex-col">
            <span className="text-lg font-bold">Allergies:</span>
            <input
                type="text"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="border border-gray-400 rounded-md px-2 py-1"
            />
        </div>
    );

}