import { useEffect } from 'react';
import { socket } from '../utils/socket';
import { useUserStore } from '../stores/userStore';

export default function SocketWrapper({ children }) {
    const setUser = useUserStore(state => state.setUser);

    useEffect(() => {
        socket.on('guestPlayerCreated', ({ nick_name, player_id, role, token }) => {
            const userData = { nick_name, player_id, role, image: null }
            setUser(userData, token);
        });

        if (!socket.connected) {
            console.log('User connecting');
            socket.connect();
        }
        
        return () => {
            socket.off('guestPlayerCreated');

            if (socket.connected) {
                console.log('User disconnecting');
                // socket.disconnect();
            }
        };
    }, []);

    return <>{children}</>;
}