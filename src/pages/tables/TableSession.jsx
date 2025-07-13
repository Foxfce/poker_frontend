import ChatPanel from "../../components/chatTable/ChatPanel"
import pokertable from '../../assets/Poker_table_red.jpg'
import CardFace from "../../components/table/CardFace"
import { useCardStore } from "../../stores/cardStore"
import PlayerStat from "../../components/table/PlayerStat"
import { useEffect } from "react"
import PlayerAction from "../../components/table/PlayerAction"
import EmptySeat from "../../components/table/EmptySeat"
import { useSeatStore } from "../../stores/seatStore"
import { useGameStore } from "../../stores/gameStore"
import { useUserStore } from "../../stores/userStore"
import { useParams } from "react-router"
import { usePlayerStore } from "../../stores/playerStore"

function TableSession() {
    const { tableId } = useParams();

    const user = useUserStore(state => state.user);
    const community_card = useCardStore(state => state?.community_card);
    const tableSeat = useSeatStore(state => state?.tableSeat);
    const gameRound = useGameStore(state => state?.round);
    const playerTurn = useGameStore(state => state?.player_turn);
    const checkWinner = useCardStore(state => state.checkWinner);

    const players = usePlayerStore(state => state?.players);



    useEffect(() => {

        checkWinner([1, 2, 3, 4]);
    }, []);

    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <div className="h-full w-full absolute bg-black z-[-1]" />
            <img src={pokertable} alt="table" className="absolute h-full w-1/1 -translate-x-1/2 z-[-1]" />

            {/* Game Section */}
            <div className={`flex grow-4 min-w-[375px] relative`}>

                <div className="absolute top-5/6 left-1/8 flex items-center h-fit w-fit">
                    {tableSeat[0] ? <PlayerStat id={tableSeat[0]} playerNumber='1' /> : (gameRound || <EmptySeat seatNumber='1' />)}
                </div>
                <div className="absolute top-2/9 left-1/8 flex items-center h-fit w-fit">
                    {tableSeat[1] ? <PlayerStat id={tableSeat[1]} playerNumber='2' /> : (gameRound || <EmptySeat seatNumber='2' />)}
                </div>
                <div className="absolute top-2/6 left-1/2 flex items-center h-fit w-fit">
                    {tableSeat[2] ? <PlayerStat id={tableSeat[2]} playerNumber='3' /> : (gameRound || <EmptySeat seatNumber='3' />)}
                </div>
                <div className="absolute top-4/6 left-1/2 flex items-center h-fit w-fit">
                    {tableSeat[3] ? <PlayerStat id={tableSeat[3]} playerNumber='4' /> : (gameRound || <EmptySeat seatNumber='4' />)}
                </div>

                {/* Community Card */}
                <div className="absolute top-3/8 left-1/15 flex flex-col gap-2 items-center h-fit w-fit">
                    {/* POT */}
                    <div className="flex justify-center py-1 px-16 rounded-full bg-black ">
                        <span className="text-amber-400 font-bold text-2xl">{'Pot : 1000'}</span>
                    </div>

                    {/* Community Card */}
                    <div className="flex gap-4">
                        {community_card.map((el, index) => <CardFace key={(index + 1)} cardRank={el} />)}
                    </div>

                    {/* Game Stat */}
                    <div className="flex gap-4 justify-center py-1 px-16 rounded-full bg-black ">
                        <span className="text-white font-bold text-xl">#</span>
                        <span className="text-amber-400 font-bold text-xl">Your Turn</span>
                        <span className="text-white font-bold text-xl">Deals</span>
                        <span className="text-amber-400 font-bold text-xl">1</span>
                        <span className="text-white font-bold text-xl">Rounds</span>
                        <span className="text-amber-400 font-bold text-xl">1</span>
                    </div>
                </div>
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