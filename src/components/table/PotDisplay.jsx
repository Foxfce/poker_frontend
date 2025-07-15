import { useState } from 'react'
import { usePotStore } from '../../stores/potStore';
import { LeftMore } from '../../icons';

function PotDisplay() {
    const pot = usePotStore(state => state.pot);
    const currentPotPrice = usePotStore(state => state.current_pot_price);

    const [showPotModal, setShowPotModal] = useState(false);
    return (
        <>
            <div
                className="absolute -left-1/5 h-full aspect-square flex justify-center items-center rounded-full bg-black hover:bg-gray-800"
                onClick={() => setShowPotModal(prv => !prv)}
            >
                <LeftMore className='scale-75' />
            </div>

            {
                showPotModal && <div className="absolute -left-3/4 -top-6 flex flex-col justify-center items-center py-2 px-4 rounded-md bg-black" onClick={() => setShowPotModal(false)}>
                    {pot.map((pot,index) => (
                        <span key={index}
                            className=" text-amber-400 font-bold text-md">
                            {`Pot${pot?.pot_number} : ${pot?.price}`}
                        </span>
                    ))}
                </div>
            }
            <span className="text-amber-400 font-bold text-2xl">{`Pot : ${currentPotPrice}`}</span>
        </>
    )
}

export default PotDisplay