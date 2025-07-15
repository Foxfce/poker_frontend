import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { socket } from "../utils/socket";

export const useChatStore = create(
    persist(
        (set, get) => ({
            chat: [],
            updateChatState: (chatData) => {
                set({ chat: chatData })
            },
            sendMessage: ({ name, message, player_id }) => {
                socket.emit("sendMessage", { name, message, player_id});
            },
            resetState: () => {
                set({ chat: [] })
            }
        }), {
        name: 'chatState',
        storage: createJSONStorage(() => sessionStorage)
    }
    )
);