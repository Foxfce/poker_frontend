import { useEffect } from 'react';
import { useCardStore } from '../../stores/cardStore'
import CardFace from './CardFace'
import Participant from './Participant'
import { usePlayerStore } from '../../stores/playerStore';
import { useGameStore } from '../../stores/gameStore';

function PlayerStat(props) {
    const { id, playerNumber } = props
    const player = usePlayerStore(state => state.players.find((player) => player?.id === id))//player.id === id ? player : null)

    const player_card = useCardStore(state => state[`player${playerNumber}`]);
    const handValue = useCardStore(state => state[`player${playerNumber}_rank`]);
    const evaluatedHand = useCardStore(state => state.evaluatedHand);

    const playerTurn = useGameStore(state => state?.player_turn);
    const winner = useGameStore(state => state?.winner)

    useEffect(() => {
        evaluatedHand(playerNumber);
    }, [player_card])


    return (
        <>
            {/* Picture */}
            <div className='relative'>
                <Participant imgSrc={player?.image} className='w-26 rounded-full bg-gray-200' />
                {(playerTurn?.playerId === player?.id)? <div className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-full h-full border rounded-full border-amber-400 border-6' />:null}
            </div >

            {/* Stat */}
            < div className="flex flex-col gap-4 relative" >

                {/* Only user can see  */}
                {handValue && (< div className="absolute -translate-y-1/2 -left-2 -top-18 z-[1] flex flex-col items-center py-1 px-2 gap-1 border-4 border-gray-400 bg-gray-950 rounded-full w-[200px]" >
                    <span className="text-lg text-gray-300 font-semibold">{`${winner && 'WINNER :'} ${handValue}`}</span>
                </div >)}

                <div className="absolute -translate-y-1/2 -left-4 -top-40 flex gap-4">
                    {player_card ? player_card.map((el, index) => <CardFace key={(index + 1)} cardRank={el} />): null}

                </div>

                <div className="absolute -translate-y-1/2 -left-8 z-[-1] flex flex-col items-center py-2 px-4 gap-1 border-4 border-gray-400 bg-gradient-to-b from-noirRed-950 to-noirRed-400 rounded-lg w-[240px]">
                    <span className="text-xl text-gray-300 font-bold">{player?.name || 'name'}</span>
                    <span className="text-xl text-gray-50 font-bold">${player?.pocket || 'none'}</span>
                </div>

            </div >
            {/* Stat */}
        </>
    )
}

export default PlayerStat