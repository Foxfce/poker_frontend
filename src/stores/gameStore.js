import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { usePlayerStore } from "./playerStore";
import { useUserStore } from "./userStore";
import { useSeatStore } from "./seatStore";
import { socket } from "../utils/socket";

export const useGameStore = create(
    persist(
        (set, get) => ({
            // Mocking Data can delete
            tableId: null,
            password: null,
            round: null,
            card_revealed: 3,
            current_pot: 1,
            current_bet: 100,
            player: [],
            call_player: [],
            fold_player: [],
            blinds_seatId: 1,
            player_turn: null, // will take turn if user.player_id != player_turn prevent emit action { playerId: 'AbsH', playerName: 'Hello' }
            winner: null,
            startGame: () => {

                // All this should be on server side and emit back
                set({
                    round: 1,
                    card_revealed: 3,
                    current_pot: 1,
                    current_bet: 50,
                    player: [null, null, null, null], // shouldn't allow to start game if no player on seat
                    call_player: [],
                    fold_player: [],
                    winner: null,
                })
                // use fucntion updatePlayerturn set whose turn with reference playerId 
                get().updatePlayerTurn(useSeatStore.getState().tableSeat[get().blinds_seatId])

                // Set next game start for player to the left
                incrementBlindSeatId();

                // socket.emit('startGame'); //
            },
            updateGameState: (data) => {
                set({
                    round: data.round,
                    card_revealed: data.card_revealed,
                    current_pot: data.current_pot,
                    current_bet: data.current_bet,
                    player: data.player,
                    call_player: data.call_player,
                    allIn_player: data.allIn_player,
                    fold_player: data.fold_player,
                    blinds_seatId: data.blinds_seatId,
                    player_turn: data.player_turn,
                    winner: data.winner,
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
            updateCallPlayer: (seatId) => {
                set({ call_player: [...get().call_player, seatId] });
            },
            updateFoldPlayer: (seatId) => {
                set({ fold_player: [...get().fold_player, seatId] });
            },
            callPlayerReAction: (seatId) => {
                set({ fold_player: { ...get().player, seatId } });
            },
            updatePlayerTurn: (playerId) => {
                if (useUserStore.getState().user?.player_id === playerId) return set({ player_turn: { playerId: playerId, playerName: 'Your Turn' } });

                const playerName = (usePlayerStore.getState().players).find(player => player?.id === playerId).name
                set({ player_turn: { playerId: playerId, playerName: playerName } });
            },
            updateWinner: (userId) => {
                set({ winner: userId });
            },
            incrementBlindSeatId: () => set((state) => ({
                blinds_seatId: state.blinds_seatId + 1 > 4 ? 1 : state.blinds_seatId += 1
            })),
            resetState: () => {
                set({
                    round: null,
                    card_revealed: null,
                    current_pot: null,
                    current_bet: null,
                    player: [null, null, null, null],
                    call_player: [],
                    fold_player: [],
                    blinds_seatId: 1,
                    player_turn: { playerId: null, playerName: null },
                    winner: null
                })
            }
        }), {
        name: 'gameState',
        storage: createJSONStorage(() => sessionStorage)
    }
    )
);

// tableId: null,
//             password: null,
//             round: 1,
//             card_revealed: 3,
//             current_pot: 1,
//             current_bet: 100,
//             player: [1, 2, 3, 4],
//             call_player: [],
//             fold_player: [],
//             blinds_seatId: 1,
//             player_turn: { playerId: 'AbsH', playerName: 'Hello' }, // will take turn if user.player_id != player_turn prevent emit action
//             winner: null,