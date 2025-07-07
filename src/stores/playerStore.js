import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const usePlayerStore = create(
    persist(
        (set, get) => ({
            player: null,
            token: null,
            login: async (email, password) => {

            }

        }), {
        name: 'playerState',
        storage: createJSONStorage(() => localStorage)
    }
    )
)