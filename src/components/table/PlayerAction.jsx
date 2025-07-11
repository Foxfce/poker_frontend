import { useState } from 'react'
import { useUserStore } from '../../stores/userStore';
import { usePlayerStore } from '../../stores/playerStore';
import { useGameStore } from '../../stores/gameStore';
import { useForm, Controller } from 'react-hook-form';
import { Next } from '../../icons/index';

function PlayerAction() {
    const [isOpen, setIsOpen] = useState(false);
    const userId = useUserStore(state => state.user?.player_id);
    const maxPocket = (usePlayerStore(state => state.players.find((player) => player?.id === userId)))?.pocket;

    const currentBet = useGameStore(state => state.current_bet);

    const {
        control, watch, setValue, handleSubmit, formState: { errors }
    } = useForm({
        defaultValues: {
            min: 0,
            max: 100,
        }
    });

    const hdlSubmitBet = (data) => {
        console.log('subbmit data is ', data.raise);
        setIsOpen(false);
    }

    return (
        <div className="flex gap-4">
            <button className="btn btn-xl bg-noirRed-600 border-noirRed-600 shadow shadow-noirRed-600 text-white hover:bg-noirRed-700">CHECK</button>
            <button className="btn btn-xl bg-noirRed-600 border-noirRed-600 shadow shadow-noirRed-600 text-white hover:bg-noirRed-700">FOLD</button>
            <button
                className="btn btn-xl bg-noirRed-600 border-noirRed-600 shadow shadow-noirRed-600 text-white hover:bg-noirRed-700"
                onClick={() => setIsOpen(!isOpen)}
                tabIndex={0}
            >RAISE</button>

            {/* Raise Pop up */}
            {isOpen &&
                <div className="flex absolute -top-25 w-full" tabIndex={0}>
                    <form className="flex justify-center gap-4 bg-gray-700 w-full py-2 px-4" onSubmit={handleSubmit(hdlSubmitBet)} >
                        <div className="flex flex-col gap-4 grow-1">

                            <Controller
                                name='raise'
                                control={control}
                                rules={{
                                    min: currentBet,
                                    max: maxPocket,
                                }}
                                render={({ field }) => (
                                    <>
                                        <input
                                            type="range"
                                            min={currentBet}
                                            max={maxPocket}
                                            value={field.value}
                                            className="range range-xs"
                                            onChange={(e) => field.onChange(e.target.value)} />
                                        <input
                                            type="number"
                                            placeholder="Price here"
                                            min={currentBet}
                                            max={maxPocket}
                                            value={field.value}
                                            className="input text-noirRed-600 font-bold"
                                            onChange={(e) => field.onChange(e.target.value)} />
                                    </>
                                )
                                }
                            />

                        </div>
                        <button
                            className="btn btn-xl bg-noirRed-600 border-noirRed-600 shadow shadow-noirRed-600 hover:bg-noirRed-700 flex justify-center items-center h-full aspect-square"
                        >
                            <Next className='w-5' />
                        </button>
                    </form>
                </div>
            }

        </div>

    )
}

export default PlayerAction