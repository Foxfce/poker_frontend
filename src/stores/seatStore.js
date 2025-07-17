import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useSeatStore = create(
    persist(
        (set, get) => ({
            tableSeat: [null, null, null, null],
            isOnSeat: false,
            updateSeatState: (data) => {
                set({ tableSeat: data })
            },
            // updateNumberSeat if no 2nd arg act as remove that seat
            updateNumberSeat: (seatNumber, playerId = null) => {
                if (!seatNumber) return;
                const newSeat = [...get().tableSeat];
                newSeat.splice(+seatNumber - 1, 1, playerId);
                set({ tableSeat: [...newSeat] });
                if(get().tableSeat[seatNumber-1]) set({isOnSeat : true});
            },
            leaveSeat: (seatNumber) => {
                get().updateNumberSeat(seatNumber);
            },
            resetState: () => {
                set({ tableSeat: [null, null, null, null] })
            }
        }), {
        name: 'seatState',
        storage: createJSONStorage(() => sessionStorage)
    }
    )
);

// tableSeat: ['AbsH', 'AbsL', 'AbsS', null],