import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { LobbyBackground, LobbyLogo } from "../../icons";
import {
  handleCreatePrivateTable,
  handleJoinPrivateTable,
  handleQuickJoin,
  socket
} from "../../utils/socket";
import { useUserStore } from "../../stores/userStore";
import Participant from "../../components/table/Participant";
import LoginModal from "../../components/LoginModal";
import RegisterModal from "../../components/RegisterModal";
import JoinTable from "../../components/JoinTable";
import CreateTable from "../../components/CreateTable";
import { usePlayerStore } from "../../stores/playerStore";
import { useGameStore } from "../../stores/gameStore";
import { usePotStore } from "../../stores/potStore";
import { useSeatStore } from "../../stores/seatStore";
import { useCardStore } from "../../stores/cardStore";
import { useChatStore } from "../../stores/chatStore";

function TableLobby() {
  const [resetForm, setResetForm] = useState(false);

  const navigate = useNavigate();
  const [showJoinTable, setShowJoinTable] = useState(false);
  const [showCreateTable, setShowCreateTable] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [isOnQueue, setIsOnQueue] = useState(false);

  const user = useUserStore(state => state.user);
  const token = useUserStore(state => state.token);
  const setUser = useUserStore(state => state.setUser);



  useEffect(() => {    
    socket.on('quickJoinTableAssignedRoom', ({ tableId, message, tableData }) => {
      setIsOnQueue(false);
      console.log(message);
      
      usePlayerStore.getState().updateAllPlayers(tableData.players);
      useGameStore.getState().updateGameState(tableData.gameState);
      usePotStore.getState().updatePotState(tableData.potState);
      usePotStore.getState().updateSidePotState(tableData.sidePotState);
      useSeatStore.getState().updateSeatState(tableData.seatState);
      useCardStore.getState().setCommunityCard(tableData.community_card);
      useCardStore.getState().setPlayerCard(tableData.player1, tableData.player2, tableData.player3, tableData.player4)
      useChatStore.getState().updateChatState(tableData.chatState);
      
      navigate(`/table/${tableId}`);
    });
    if (!socket.connected) socket.connect();
    
    return () => {
      socket.off('quickJoinTableAssignedRoom')
    };
  }, []);

  const hdlClickQuickJoin = () => {
    handleQuickJoin(user, setIsOnQueue);
  }

  const hdlClickJoinTable = () => {
    setShowJoinTable(true);
    document.getElementById('lobby_modal').showModal();
  }

  const hdlClickCreateTable = () => {
    setShowCreateTable(true);
    document.getElementById('lobby_modal').showModal()
  }

  const onClose = async () => {
    setTimeout(() => {
      setResetForm(prv => !prv)
      setShowCreateTable(false);
      setShowJoinTable(false);
      setShowLogin(false);
      setShowRegister(false);
    }, 500);
  }


  return (
    <>
      <div className='flex flex-col justify-center items-center w-screen h-screen relative overflow-hidden'>
        <LobbyBackground className="absolute scale-150 -translate-x-1/2 left-1/2 bottom-10 z-[-1]" />
        {/* <img src={pokertable} alt="table" className="absolute h-full w-1/1 -translate-x-1/2 z-[-1]" /> */}
        <div className='flex flex-col justify-center items-center gap-6 w-80 absolute -translate-x-1/2 left-3/7'>
          <LobbyLogo />

          <div className="flex h-fit w-full gap-5 justify-center">
            <div>
              <Participant imgSrc={user?.image} className='w-20 rounded-full bg-gray-200' />
            </div>
            <div className="flex gap-4 justify-center">
              <div className="flex flex-col h-full justify-center">
                <span className="text-white font-bold text-xl">Name</span>
                <span className="text-white font-bold text-xl">PlayerID</span>
              </div>
              <div className="flex flex-col h-full justify-center">
                <span className="text-white font-bold text-xl">{`: ${user?.nick_name}`}</span>
                <span className="text-white font-bold text-xl ">{`: ${user?.player_id}`}</span>
              </div>

            </div>
          </div>

          <button
            disabled={isOnQueue}
            className="relative btn btn-xl w-full text-white bg-noirRed-600 border-noirRed-600 shadow shadow-noirRed-600 hover:bg-noirRed-700"
            onClick={hdlClickQuickJoin}>
            {isOnQueue && <span className="loading loading-spinner absolute right-5/6 text-noirRed-600"></span>}
            QUICK JOIN
          </button>
          <button
            className="btn btn-xl w-full text-white bg-noirRed-600 border-noirRed-600 shadow shadow-noirRed-600 hover:bg-noirRed-700 "
            onClick={hdlClickJoinTable}>
            JOIN TABLE
          </button>
          <button
            className="btn btn-xl w-full text-white bg-noirRed-600 border-noirRed-600 shadow shadow-noirRed-600 hover:bg-noirRed-700"
            onClick={hdlClickCreateTable}>
            CREATE TABLE
          </button>
          <button
            className="btn btn-xl w-full text-white bg-gray-800 border-gray-800 shadow shadow-gray-900 hover:bg-gray-700 "
            onClick={() => navigate('/news')}>
            LEAVE
          </button>
        </div>
      </div>

      <dialog id="lobby_modal" className="modal modal-bottom sm:modal-middle" onClose={onClose}>
        <div className="modal-box">
          {showCreateTable && <CreateTable resetForm={resetForm} />}
          {showJoinTable && <JoinTable resetForm={resetForm} />}
          {showRegister && <RegisterModal resetForm={resetForm} />}
          {showLogin && <LoginModal resetForm={resetForm} />}
        </div>
      </dialog >
    </>

  )
}

export default TableLobby