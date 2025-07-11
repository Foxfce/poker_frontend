import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useGameStore = create(
    persist(
        (set, get) => ({
            round: null,
            card_reveaeled: 3,
            current_pot: 1,
            current_bet : 100,
            player: [1,2,3,4],
            call_player : [],
            fold_player: [],
            winner : null,
            login: async (email, password) => {

            },

        }), {
        name: 'gameState',
        storage: createJSONStorage(() => localStorage)
    }
    )
);