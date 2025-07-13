import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useGameStore = create(
    persist(
        (set, get) => ({
            // Mocking Data can delete
            pot: [
                {
                    pot_number: 1,
                    price: 2000,
                    participant: [1, 2, 3, 4],
                },
                {
                    pot_number: 1,
                    price: 2000,
                    participant: [1, 2, 3, 4],
                },
            ],
            pot_number: 1,
            price: 2000,
            participant: [1, 2, 3, 4],
            updatePotState: (data) => {
                set({ pot: data })
            },
            updatePot: (potNumber) => {
                set({ current_pot: potNumber });
                console.log('Game update current pot to :', get().current_pot);
            },
            updateCurrentBet: (currentBet) => {
                set({ current_bet: currentBet });
                console.log('Game update current bet to :', get().current_bet);
            },
            resetState: () => {
                set({
                    round: null,
                    card_revealed: null,
                    current_pot: null,
                    current_bet: null,
                    player: [null, null, null, null],
                    call_player: [],
                    fold_player: [],
                    winner: null
                })
            }
        }), {
        name: 'gameState',
        storage: createJSONStorage(() => localStorage)
    }
    )
);