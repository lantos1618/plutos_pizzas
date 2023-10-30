"use client";

import { useStore } from "./store";

export function OrderNotes() {
    const notes = useStore((state) => state.notes);
    const setNotes = useStore((state) => state.setNotes);
    
    return (
        <div className="flex flex-col">
            <span className="text-lg font-bold">Notes:</span>
            <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="border border-gray-400 rounded-md px-2 py-1"
            />
        </div>
    );

}