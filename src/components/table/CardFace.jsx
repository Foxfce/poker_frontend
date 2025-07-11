import { useEffect, useState } from "react";
import { Club, Diamond, Heart, Logo, Spade } from "../../icons"

function CardFace(props) {
    const { cardRank } = props;
    const [suit, setSuit] = useState(null);
    const [rank, setRank] = useState(null);

    useEffect(() => {
        if (cardRank) {
            setSuit(cardRank[1]);
            setRank(cardRank[0].toUpperCase());
        }
    }, [])

    return (
        <div className="flex h-[146px] w-[100px] rounded-xl">
            {!cardRank ? (
                < div className="flex justify-center items-center h-full w-full object-fill relative border-gray-400  bg-[#1A1A1A] border-6 rounded-xl" >
                    <Logo className='scale-250' />
                </div>
            ) : (
                < div className="flex justify-center items-center h-full w-full object-fill relative   bg-white rounded-xl" >
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <span className={`text-6xl font-bold text-center ${(suit === 'd' || suit === 'h') ? 'text-noirRed-600' : ''}`}>{rank === 'T' ? '10' : rank}</span>
                        {suit === 's' ? <Spade className='w-8' />
                            : suit === 'h' ? <Heart className='w-8' />
                                : suit === 'd' ? <Diamond className='w-8' />
                                    : suit === 'c' ? <Club className='w-8' />
                                        : null}
                    </div>
                </div >

            )

            }

        </div >
    )
}

export default CardFace