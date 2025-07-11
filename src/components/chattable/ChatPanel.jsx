import { useEffect, useRef } from "react"
import ChatBox from "../../components/chatTable/ChatBox"
import Participant from "../../components/table/Participant"
import { Microphone, Send } from "../../icons"

function ChatPanel() {
    const ref = useRef();

    useEffect(() => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, [])

    return (
        <div className="flex flex-col w-full gap-2">
            <div className="flex justify-center items-center bg-gradient-to-r from-noirRed-400 to-noirRed-600 h-12 w-fit rounded-full px-6">
                <span className="text-xl font-bold text-gray-200">Participant</span>
            </div>

            {/* Participant logo */}
            <div className="flex items-center gap-4 bg-gray-400 w-full h-fit py-4 px-4">

                <Participant className='w-18 rounded-full bg-gray-200' />
                <Participant className='w-18 rounded-full bg-gray-200' />
                <Participant className='w-18 rounded-full bg-gray-200' />

            </div>

            {/* Chat Panel */}
            <div className="flex flex-col justify-end grow-1 min-h-[360px] bg-gray-900 w-full rounded-4xl px-8 py-4">
                <div className="flex flex-col h-fit max-h-full w-full gap-4 overflow-y-auto text-white">
                    <ChatBox />
                    <ChatBox message='hello' />
                    <div ref={ref} />
                </div>
            </div>

            {/* Chat Action */}
            <div className="flex justify-between w-full h-18 gap-2">

                <div className="flex items-center justify-center avatar h-full aspect-square bg-gray-900 rounded-full hover:bg-gray-800 cursor-pointer">
                    <Microphone className='w-12' />
                </div>

                <div className="flex w-full bg-gray-900 h-full rounded-full px-6 py-4 overflow-y-auto ">

                    {/* insert text */}
                    <textarea
                        className="text-gray-50 text-2xl font-semibold w-full break-words resize-none focus:outline-none hide-scrollbar"
                    />
                </div>

                <div className="flex items-center justify-center avatar h-full aspect-square bg-gray-900 rounded-full hover:bg-gray-800 cursor-pointer">
                    <Send className='w-12' />
                </div>

            </div>

        </div>
    )
}

export default ChatPanel