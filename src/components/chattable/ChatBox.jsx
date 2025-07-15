import { usePlayerStore } from "../../stores/playerStore"
import Participant from "../table/Participant"

function ChatBox(props) {
  const {message,player_id,name, ...resProps} = props
  const players = usePlayerStore(state => state.players);
  const image = players.map((player) =>player?.id === player_id ? player.image : null)

  return (
    <div className="flex gap-2 items-center">
      <Participant className='w-16 h-16 rounded-full bg-gray-200' imgSrc={image && null} />
      <div className="flex items-center bg-gray-800 p-4 max-w-full rounded-2xl">
        <span className="text-gray-50 text-2xl font-semibold text-wrap">

          {message ? message :"Dummy text or no message send"}

        </span>
      </div>
    </div>
  )
}
export default ChatBox