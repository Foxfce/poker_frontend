import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
    login,
    register
} from '../services/authService';
import isTokenExpired from "../utils/tokenUtils";
import {
    getMyProfile
} from "../services/userService";

export const useUserStore = create(
    persist(
        (set, get) => ({
            user: {},
            token: null,
            register: async (username, password) => {
                const response = await register(username, password);
                return response;
            },
            login: async (username, password) => {
                const accessToken = await login(username, password);
                set({ token: accessToken })

                // Fetch user
                get().getUser();
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
            },
            setUser: (user,token) => {
                set({ user: user, token : token });
            },

        }), {
        name: 'userState',
        storage: createJSONStorage(() => sessionStorage)
    }
    )
);

 // Form
//  {
     // nick_name : 'Bobby', 
     // player_id : 'AbsH',
     // image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRajB3ZHFMBFfBiAAhjevGDY6g3Qyym1IJ0c2AmuNP9lSYblFxz29VPeHzauMPBfzBxmNE&usqp=CAU'
//  }