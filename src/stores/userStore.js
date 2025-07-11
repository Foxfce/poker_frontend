import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
    login
} from '../services/authService';
import isTokenExpired from "../utils/tokenUtils";
import {
    getMyProfile
} from "../services/userService";

export const useUserStore = create(
    persist(
        (set, get) => ({
            user: { // Use for testing only
                nick_name : 'Bobby', 
                player_id : 'AbsH',
            },
            token: null,
            login: async (username, password) => {
                const accessToken = await login(username, password);
                set({ token: accessToken })

                // Fetch user
            },
            logout: () => set({ user: null, token: null }),
            getUser: async () => {
                const token = get().token;
                if (!token) return console.error('Invalid Token');

                if (isTokenExpired(token)) {
                    console.warn('Token expired');
                    return get().logout();
                }

                try {
                    const user = await getMyProfile(token);
                    set({ user: user })

                } catch (error) {
                    get().logout();
                }
            }

        }), {
        name: 'userState',
        storage: createJSONStorage(() => localStorage)
    }
    )
);

// id              Int         @id @default(autoincrement())
//   username        String?     @unique @db.VarChar(100)
//   nick_name       String?     @db.VarChar(100)
//   player_id       String      @unique @db.VarChar(5)
//   password        String?     @db.Text
//   role            Player_Role @default(GUEST)
//   profile_picture String?
//   about           String?
//   current_pocket  Float       @default(2000)
//   total_win       Int?        @default(0)
//   total_losees    Int?        @default(0)
//   total_earning