import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useGameStore = create(
    persist(
        (set, get) => ({
            // Mocking Data can delete
            round: null,
            card_revealed: 3,
            current_pot: 1,
            current_bet: 100,
            player: [1, 2, 3, 4],
            call_player: [],
            fold_player: [],
            winner: null,
            updateGameState: (data) => {
                set({
                    round: data.round,
                    card_revealed: data.card_revealed,
                    current_pot: data.current_pot,
                    current_bet: data.current_bet,
                    player: data.player,
                    call_player: data.call_player,
                    fold_player: data.fold_player,
                    winner: null,
                })
            },
            updatePot: (potNumber) => {
                set({ current_pot: potNumber });
                console.log('Game update current pot to :', get().current_pot);
            },
            updateCurrentBet: (currentBet) => {
                set({ current_bet: currentBet });
                console.log('Game update current bet to :', get().current_bet);
            },
            updateCallPlayer: (tableId) => {
                set({ call_player: { ...get().call_player, tableId } });
            },
            updateFoldPlayer: (tableId) => {
                set({ fold_player: tableId });
            },
            callPlayerReAction: (tableId) => {
                set({ fold_player: { ...get().player, tableId } });
            },
            updateWinner: (userId) => {
                set({ winner: userId });
            },
            resetState: () => {
                set({
                    round: null,
                    card_revealed: null,
                    current_pot: null,
                    current_bet: null,
                    player: [null,null,null,null],
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