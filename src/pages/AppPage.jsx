import { useState, useEffect } from 'react'
import { Square } from '../components/Square'
import { TURNS } from '../constans'
import { WinnerModal } from '../components/WinnerModal'
import '../app.css'


import { db } from '../database/firebaseConfig'
import { doc, onSnapshot } from 'firebase/firestore';
import 'firebase/database';
import { useDispatch, useSelector } from 'react-redux'
import WaitingModal from '../components/WaitingModal'
import { useNavigate } from 'react-router-dom'
import { resetGame, updateBoard } from '../logic/gameFunctions'
import { deleteGameCode } from '../store/room/roomSlice'


function AppPage() {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [gameSettings, setGameSettings] = useState({
    nickname1: '',
    nickname2: '',
    buttonText: 'Empezar de nuevo',
  });

  //-----------------------//
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);
  const [scoreX, setScoreX] = useState(null);
  const [scoreO, setScoreO] = useState(null);

  const { code } = useSelector(state => state.room);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 


  const gamesCollection = doc(db, 'games', `${code}`);
  const nickCollection = doc(db, 'nicknames', `${code}`);
 

  useEffect(() => {

    const unsubscribeGame = onSnapshot(gamesCollection, (doc) => {
      const data = doc.data();
      if (data) {
        setBoard(data.board);
        setTurn(data.turn);
        setWinner(data.winner);
      }
    });

    const unsubscribeNick = onSnapshot(nickCollection, (doc) => {
      const data = doc.data();
      if (data) {

        if (data && Array.isArray(data.nick) && data.nick.length === 2) {
          setGameSettings(prevState => ({
            ...prevState,
            nickname1: data.nick[0],
            nickname2: data.nick[1]
          }));
        }
      }
    });

    return () => {
      unsubscribeGame();
      unsubscribeNick();
    };
  }, [code]);

  // WINNER POINTS
  useEffect(() => {
    if (winner == 'X') {
      setScoreX(scoreX + 1)
    } else if (winner == 'O') {
      setScoreO(scoreO + 1)
    }

  }, [winner]);


  useEffect(() => {
    if (scoreX === 3 || scoreO === 3) {
      setGameSettings(prevState => ({
        ...prevState,
        buttonText: 'Salir',
      }));
    }
  }, [scoreX, scoreO]);

const deleteCodeFunction = () => {
dispatch(deleteGameCode());

}
 


  const handleResetGame = () => {
    resetGame(setBoard, setTurn, setWinner, gamesCollection, scoreX, scoreO, navigate, code, deleteCodeFunction);
  };


  const handleUpdateBoard = (index) => {
    updateBoard(index, { board, winner, setWinner, turn, gamesCollection })
  }


  return (
    <>
      {gameSettings.nickname2 === '' &&
        <WaitingModal code={code} />
      }

      <div className="nicksContainer">
        <h2>{gameSettings.nickname1}</h2>
        <h2>{gameSettings.nickname2}</h2>
        <h3>{scoreX}</h3>
        <h3>{scoreO}</h3>
      </div>

      <main className='board'>
        <section className='game'>
          {
            board && board.map((square, index) => {
              return (
                <Square
                  key={index}
                  index={index}
                  updateBoard={handleUpdateBoard}
                >
                  {square}
                </Square>
              )
            })
          }
        </section>
        <section className='turn'>

          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>
        <WinnerModal resetGame={handleResetGame} winner={winner} buttonText={gameSettings.buttonText} />

      </main>

    </>

  )
}

export default AppPage
