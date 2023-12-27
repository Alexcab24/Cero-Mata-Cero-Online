import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { joinGameCode, setGameCode } from '../store/room/roomSlice';

import RoomModal from '../components/RoomModal';
import { deleteGameData, getGameData, saveNicknameToFirebase } from '../database/firebaseQuery';
import '../styles/roomStyles.css'



const RoomPage = () => {

  const [roomCode, setRoomCode] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { code } = useSelector(state => state.room);
  const { nickName } = useSelector(state => state.nick);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setRoomCode(event.target.value);
  };

  const closeModal = () => {
    setIsOpen(false);
    deleteGameData(code)
  };

  const handleJoinRoom = async () => {


    const gameSnap = await getGameData(code || roomCode);

    dispatch(joinGameCode(roomCode || code))
    if (gameSnap.exists()) {
      const nickCode = code || roomCode
      saveNicknameToFirebase(nickName, nickCode)
      navigate('/game');
    } else {
      console.log('El valor no existe en la base de datos');
    }


  };

  const handleCreateRoom = async () => {
    setRoomCode(code)
    setIsOpen(true);
    dispatch(setGameCode());
  };

  return (
    <div className="container">
      <h1>CERO MATA CERO</h1>

      <div className="code-container">
        <div className="box-input">
          <input
            type="text"
            id="roomCode"
            placeholder='PIN de juego'
            value={roomCode}
            onChange={handleInputChange}
          />
        </div>
        <div className="buttonsRoom">
          <button className="roomButton" onClick={handleJoinRoom}>
            <span className="front">
              Join game
            </span>
          </button>
          <button className="roomButton" onClick={handleCreateRoom}>
            <span className="front">
              New room
            </span>
          </button>
        </div>
      </div>

      <RoomModal
        isOpen={isOpen}
        code={code}
        handleJoinRoom={handleJoinRoom}
        closeModal={closeModal}
      />
    </div>
  );
}

export default RoomPage
