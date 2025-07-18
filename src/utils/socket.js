import { useNavigate } from 'react-router';
import { io } from 'socket.io-client';
import { useUserStore } from '../stores/userStore';
import { useGameStore } from '../stores/gameStore';
import { usePlayerStore } from '../stores/playerStore';
import { usePotStore } from '../stores/potStore';
import { useSeatStore } from '../stores/seatStore';
import { useCardStore } from '../stores/cardStore';
import { useChatStore } from '../stores/chatStore';

const URL = 'http://localhost:6969';

export const socket = io(URL, {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    auth: {
        token: useUserStore.getState().token,
        nick_name: useUserStore.getState().user?.nick_name,
        player_id: useUserStore.getState().user?.player_id,
        role: useUserStore.getState().user?.role
    }
});

export const handleUpdateState = ({ tableData }) => {
    usePlayerStore.getState().updateAllPlayers(tableData.players);
    useGameStore.getState().updateGameState(tableData.gameState);
    usePotStore.getState().updatePotState(tableData.potState);
    usePotStore.getState().updateSidePotState(tableData.sidePotState);
    useSeatStore.getState().updateSeatState(tableData.seatState);
    useCardStore.getState().setCommunityCard(tableData.community_card);
    useCardStore.getState().setPlayerCard(tableData.player1, tableData.player2, tableData.player3, tableData.player4)
    useChatStore.getState().updateChatState(tableData.chatState);

    console.log('Updated State');
}


export const handleConnect = () => {
    if (socket.recovered) {
        console.log('Successfully recovered previous session!')
        socket.emit('resyncGameData', { tableId: tableId });
        return;
    }
    console.log('New connection or unrecover session');
}

export const handleDisconnected = (reason) => {
    console.log('Disconnected ', reason);

    // Show modal ''Reconnecting . . .
}

export const handleReconnected = (data) => {
    console.log(data.message);
    useUserStore.setState({ user: data.user });
}

export const handleTrulyDisconnected = (data) => {
    const navi = useNavigate();
    console.log(data?.message);
    alert('You are diconnected');
    navi('/table');
}

export const handleCreatePrivateTable = (password) => {
    const navi = useNavigate();
    socket.emit('createPrivateTable', { password: password }, (response) => {
        if (response.success) {
            console.log(response?.message);

            const userData = useUserStore.getState().user
            alert(`Table has been create tableId : ${response.tableId}`);
            handleJoinPrivateTable(response.tableId, password, userData);
            // navi(`/${response.tableId}`);
            return;
        }
        console.error(response?.message);
        alert(`Can't create room, Try again`);
    });
}

export const handleJoinPrivateTable = (tableId, password, userData) => {
    const navi = useNavigate();
    socket.emit('joinPrivateTable', { tableId, password, userData }, (response) => {
        if (response?.success) {
            console.log(response?.message);
            navi(`/${response.tableId}`);
            return;
        }
        console.error(response?.message);
        alert(`Invalid password or tableId`);
    });
}

export const handleQuickJoin = (userData, setIsOnQueue) => {
    const { nick_name, player_id, role, image = null } = userData;
    socket.emit('quickJoinTable', { nick_name, player_id, role, image }, (response) => {
        if (response?.success) {
            setIsOnQueue(true);
            console.log(response?.message);
            return;
        }
        console.error(response?.message);
    })
}

// export const 