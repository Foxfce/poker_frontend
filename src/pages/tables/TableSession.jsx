import ChatPanel from "../../components/chatTable/ChatPanel"
import pokertable from '../../assets/Poker_table_red.jpg'
import CardFace from "../../components/table/CardFace"
import { useCardStore } from "../../stores/cardStore"
import PlayerStat from "../../components/table/PlayerStat"
import { useEffect, useState } from "react"
import PlayerAction from "../../components/table/PlayerAction"
import EmptySeat from "../../components/table/EmptySeat"
import { useSeatStore } from "../../stores/seatStore"
import { useGameStore } from "../../stores/gameStore"
import { useUserStore } from "../../stores/userStore"
import { useParams } from "react-router"
import PotDisplay from "../../components/table/PotDisplay"
import { usePotStore } from "../../stores/potStore"
import { useNavigate } from "react-router"

import {
    socket,
    handleConnect,
    handleDisconnected,
    handleReconnected,
    handleTrulyDisconnected,
    handleUpdateState,
} from '../../utils/socket.js';
import { usePlayerStore } from "../../stores/playerStore.js"
import { useChatStore } from "../../stores/chatStore.js"

function TableSession() {
    const { tableId } = useParams();
    const navigate = useNavigate();

    const user = useUserStore(state => state.user);
    const setUser = useUserStore(state => state.setUser);
    const community_card = useCardStore(state => state?.community_card);
    const tableSeat = useSeatStore(state => state?.tableSeat);
    const gameRound = useGameStore(state => state?.round);
    const playerTurn = useGameStore(state => state?.player_turn);
    const pot = usePotStore(state => state.pot);

    const updatePlayerTurn = useGameStore(state => state.updatePlayerTurn);

    const [playersOnSeat, setPlayersOnSeat] = useState(null);
    const isOnSeat = useSeatStore(state => state.isOnSeat);

    //Socket useEffect on start
    useEffect(() => {
        socket.on('connect', handleConnect({ tableId }));
        socket.on('disconnect', handleDisconnected);
        socket.on('playerReconnected', handleReconnected);
        socket.on('playerTrulyDisconnected', handleTrulyDisconnected);

        //Important state update overall
        socket.on('sendUpdateState', handleUpdateState);

        socket.emit('getUpdatedState', { tableId }, (response) => {
            if (response?.success) {
                console.log(response?.message);
                return;
            }
            console.error(response?.message);
        });

        return () => {
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnected);
            socket.off('playerReconnected', handleReconnected);
            socket.off('playerTrulyDisconnected', handleTrulyDisconnected);
            socket.off('sendUpdateState', handleUpdateState);
            socket.emit("leaveTable", { tableId: tableId });
        }
    }, []);

    useEffect(() => {
        const number = tableSeat.filter((player) => player !== null).length;
        setPlayersOnSeat(number);
        
    }, [tableSeat])

    const leaveTable = () => {

        socket.emit("leaveTable", { tableId: tableId });
        navigate('/table');
    }

    const sitOut = () => {
        // Sit out can be queue up when game end leave the chair
    }

    return (
        <div className="flex h-screen w-screen overflow-hidden relative">
            <div className="absolute flex gap-4">
                <button disabled={gameRound ? true : false} className="btn btn-error text-white" onClick={() => leaveTable()}>Exit</button>
                <button disabled={gameRound ? true : false} className="btn btn-error text-white" onClick={() => sitOut()}>Sit Out</button>
            </div>

            <div className="h-full w-full absolute bg-black z-[-1]" />
            <img src={pokertable} alt="table" className="absolute h-full w-1/1 -translate-x-1/2 z-[-1]" />

            {/* Game Section */}
            <div className={`flex grow-4 min-w-[375px] relative`}>

                <div className="absolute top-5/6 left-1/8 flex items-center h-fit w-fit">
                    {tableSeat[0] ? <PlayerStat id={tableSeat[0]} playerNumber='1' /> : (isOnSeat || gameRound || <EmptySeat seatNumber='1' />)}
                </div>
                <div className="absolute top-2/9 left-1/8 flex items-center h-fit w-fit">
                    {tableSeat[1] ? <PlayerStat id={tableSeat[1]} playerNumber='2' /> : (isOnSeat || gameRound || <EmptySeat seatNumber='2' />)}
                </div>
                <div className="absolute top-2/6 left-1/2 flex items-center h-fit w-fit">
                    {tableSeat[2] ? <PlayerStat id={tableSeat[2]} playerNumber='3' /> : (isOnSeat || <EmptySeat seatNumber='3' />)}
                </div>
                <div className="absolute top-4/6 left-1/2 flex items-center h-fit w-fit">
                    {tableSeat[3] ? <PlayerStat id={tableSeat[3]} playerNumber='4' /> : (isOnSeat || gameRound || <EmptySeat seatNumber='4' />)}
                </div>

                {/* Community Card */}
                {gameRound ? <div className="absolute top-3/8 left-1/15 flex flex-col gap-2 items-center h-fit w-fit">
                    {/* POT */}
                    <div className="flex justify-center items-center py-1 px-16 rounded-full bg-black relative">
                        {pot && <PotDisplay />}
                    </div>

                    {/* Community Card */}
                    <div className="flex gap-4">
                        {community_card.map((el, index) => <CardFace key={(index + 1)} cardRank={el} />)}
                    </div>

                    {/* Game Stat */}
                    <div className="flex gap-4 justify-center py-1 px-16 rounded-full bg-black ">
                        <span className="text-white font-bold text-xl">#</span>
                        <span className="text-amber-400 font-bold text-xl">{playerTurn.playerName}</span>
                        <span className="text-white font-bold text-xl">Deals</span>
                        <span className="text-amber-400 font-bold text-xl">1</span>
                        <span className="text-white font-bold text-xl">Rounds</span>
                        <span className="text-amber-400 font-bold text-xl">{gameRound}</span>
                    </div>
                </div>
                    : <button
                        disabled={playersOnSeat < 2}
                        className={`absolute z-3 top-3/6 left-1/8 btn btn-xl bg-noirRed-600 hover:bg-noirRed-700 shadow shadow-noirRed-600 border-gray-400 border-6 text-white disabled:!bg-gray-700 disabled:shadow-none`}>
                        START GAME
                    </button>}
                {/* Community Card */}

                {/*Player Action button */}
                <div className="absolute bottom-1/15 left-1/2">
                    {(user?.player_id === playerTurn) && <PlayerAction />}
                </div>
                {/*Player Action button */}



            </div>
            {/* Game Section */}

            {/* Chat Section */}
            <div className="flex bg-violet-500 grow-1 p-4 min-w-[375px] max-w-[680px]">
                <ChatPanel />
            </div>

        </div >
    )
}

export default TableSession