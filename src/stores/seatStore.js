import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useSeatStore = create(
    persist(
        (set, get) => ({
            tableSeat : ['AbsH', 'AbsL', 'AbsS', null],
            updateSeatState: (data) => {
                set({tableSeat : data})
            },
            // updateNumberSeat if no 2nd arg act as remove that seat
            updateNumberSeat : (seatNumber, playerId=null) =>{
                const newSeat = [...get().tableSeat];
                newSeat.splice(+seatNumber-1, 1, playerId);
                set({tableSeat : [...newSeat]});
            },
            resetState: () => {
                set({tableSeat : [null,null,null,null]})
            }
        }), {
        name: 'seatState',
        storage: createJSONStorage(() => localStorage)
    }
    )
);