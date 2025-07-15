import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const usePotStore = create(
    persist(
        (set, get) => ({
            // Mocking Data can delete
            pot: [],
            current_pot_price: null,
            updatePotState: (data) => {
                set({ current_pot_price: data })
            },
            updateSidePotState: (data) => {
                set({ pot: data })
            },
            updatePot: (betPrice) => {
                set(state => ({ current_pot_price: state.current_pot_price + betPrice }));
                console.log('update current pot to :', get().current_pot);
            },
            updateCurrentBet: (currentBet) => {
                set({ current_bet: currentBet });
                console.log('Game update current bet to :', get().current_bet);
            },
            resetPotState: () => {
                set({
                    pot: [],
                    current_pot_price: null
                });
            }
        }), {
        name: 'potState',
        storage: createJSONStorage(() => sessionStorage)
    }
    )
);

// pot: [
//                 {
//                     pot_number: 1,
//                     price: 2000,
//                     participant: [1, 2, 3, 4],
//                 },
//                 {
//                     pot_number: 2,
//                     price: 2000,
//                     participant: [1, 4],
//                 },
//             ],
//             current_pot_price: 2000,