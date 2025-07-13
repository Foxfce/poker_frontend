import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { usePlayerStore } from "./playerStore";
const { Hand } = await import('pokersolver');

export const useCardStore = create(
    persist(
        (set, get) => ({
            community_card: ["2s", "3s", "4s", "9h", "8c"],
            player1: ["Js", "Ts"],
            player2: ["2h", "2c"],
            player3: ["Qs", "Ks"],
            player4: [null, null],
            player1_rank: null,
            player2_rank: null,
            player3_rank: null,
            player4_rank: null,
            setCommunityCard: async (card) => {
                set({ [objectValue]: card });
            },
            setPlayerCard: (playerNumber, card) => {
                if (playerNumber < 1 || playerNumber > 4) return console.error('Player number invalid');
                set({ [`player${playerNumber}`]: card });
            },
            resetCommunityCard: () => {
                set({ community_card: [null, null, null, null, null] });
            },
            resetPlayerCard: (playerNumber) => {
                if (playerNumber < 1 || playerNumber > 4) return console.error('Player number invalid');
                set({ [`player${playerNumber}`]: [null, null] });
                set({ [`player${playerNumber}_rank`]: null });
            },
            clearCard: () => {
                set({ community_card: [], player1: [], player2: [], player3: [], player4: [], })
            },
            evaluatedHand: async (playerNumber) => {
                const commuCard = get().community_card;
                const playerHand = get()[`player${playerNumber}`]
                const combinedHand = [...commuCard, ...playerHand].filter(value => value !== null);

                if (combinedHand.length >= 5) {
                    const handResult = await Hand.solve(combinedHand);
                    set({ [`player${playerNumber}_rank`]: handResult.name })
                }

            },
            // This checkWinner can possibly run at Server
            checkWinner: (participants) => {
                const commuCard = get().community_card;

                const inputHand = participants.map((playerNumber) => {
                    const hand = Hand.solve(([...commuCard, ...(get()[`player${playerNumber}`])]).filter(value => value !== null));
                    hand.playerNumber = playerNumber;
                    return hand
                })

                const winnerTableId = (Hand.winners(inputHand))[0].playerNumber;

                const players = usePlayerStore.getState().players

                const winner = players.find((player) => player?.tableId === winnerTableId); // (player) => player?.tableId === winnerTableId
                console.log(winner);
                return winner
            },
        }), {
        name: 'cardState',
        storage: createJSONStorage(() => localStorage)
    }
    )
);