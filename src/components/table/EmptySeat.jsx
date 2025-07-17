import { AddIcon } from "../../icons"
import { useGameStore } from "../../stores/gameStore";
import { useSeatStore } from "../../stores/seatStore";
import { useUserStore } from "../../stores/userStore";
import { socket } from "../../utils/socket";

function EmptySeat(props) {
    const { seatNumber } = props;
    const updateNumberSeat = useSeatStore(state => state.updateNumberSeat);
    const player_id = useUserStore(state => state.user?.player_id);
    const tableId = useGameStore(state => state.tableId)

    const hdlJoinSeat = () => {
        socket.emit('joinSeat', { tableId, player_id, seatNumber }, (response) => {
            if (response.success) {
                updateNumberSeat(seatNumber, player_id);
            }
            console.log(response.message);
        })
    }

    return (
        <div className="flex items-center h-fit w-fit text-gray-300 hover:text-noirRed-600" onClick={hdlJoinSeat}>
            < div >
                <div className="avatar flex justify-center items-center cursor-pointer">
                    <div className='w-26 rounded-full bg-gray-200 hover:bg-gray-300 '>
                        <AddIcon className='scale-75' />
                    </div>
                </div>
            </div >

            < div className="flex flex-col gap-4 relative" >
                <div className="absolute -translate-y-1/2 -left-8 z-[-1] flex flex-col items-center py-2 px-4 gap-1 border-4 border-gray-400 bg-gradient-to-b from-noirRed-950 to-noirRed-400 rounded-lg w-[240px]">
                    <span className="text-xl  font-bold">JOIN TABLE</span>
                </div>
            </div >
        </div>
    )
}

export default EmptySeat