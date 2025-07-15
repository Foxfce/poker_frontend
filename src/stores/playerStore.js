import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const usePlayerStore = create(
    persist(
        (set, get) => ({
            players: [null, null, null, null],
            updateAllPlayers: (data) => {
                set({ players: data})
            },
            addJoinedPlayer: (data) => {
                set({
                    player: [...get().players, {
                        id: data?.id,
                        seatId: null,
                        nick_name: data?.nick_name,
                        image: data?.img || null,
                        pocket: null,
                    }
                    ]
                });
            },
            updateSeatId: (id, seatId) => {
                set((state) => ({
                    players: state.players.map((player) =>
                        player?.id === id ? { ...player, seatId: seatId } : player
                    ),
                }))
            },
            updatePocket: (id, newPocket) => {
                set((state) => ({
                    players: state.players.map((player) =>
                        player?.id === id ? { ...player, pocket: newPocket } : player
                    ),
                }))
            },
            updatePocketAtGameStart: () => {
                set((state) => ({
                    players: state.players.map((player) =>
                        player ? { ...player, pocket: 2000 } : player
                    ),
                }))
            },
        }), {
        name: 'playerState',
        storage: createJSONStorage(() => sessionStorage)
    }
    )
);

// players: [{
//                 id: 'AbsH',
//                 seatId: 1,
//                 name: 'john',
//                 image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/de1bbf90617233.5e1c78d58d809.jpg',
//                 pocket: 2000,
//             }, {
//                 id: 'AbsL',
//                 seatId: 2,
//                 name: 'Charlie',
//                 image: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_20/2860886/190517-grumpy-cat-mc-10372.JPG',
//                 pocket: 1500,
//             }, {
//                 id: 'AbsS',
//                 seatId: 3,
//                 name: 'john',
//                 image: 'https://thumbs.dreamstime.com/b/alpaca-funny-face-looking-camera-closeup-petting-zoo-bad-teeth-109883330.jpg',
//                 pocket: 1500,
//             },
//                 null
//             ],