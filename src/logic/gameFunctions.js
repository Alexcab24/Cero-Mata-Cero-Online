import { setDoc, updateDoc } from "firebase/firestore";
import { TURNS } from "../constans";
import confetti from "canvas-confetti";
import { checkEndGame, checkWinnerFrom } from "./board";
import { deleteGameData } from "../database/firebaseQuery";


const resetGame = (setBoard, setTurn, setWinner, gamesCollection, scoreX, scoreO, navigate, code, deleteCodeFunction) => {


  if (scoreX === 3 || scoreO === 3) {
    navigate('/room')
    deleteGameData(code);
    deleteCodeFunction()
  } else {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    setDoc(gamesCollection, {
      board: Array(9).fill(null),
      turn: TURNS.X,
      winner: null
    });
  }
};

const updateBoard = (index, { board, winner, setWinner, turn, gamesCollection }) => {
  if (board[index] || winner) return;

  const newBoard = [...board];
  newBoard[index] = turn;

  const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
  const newWinner = checkWinnerFrom(newBoard);
  const gameEnded = newWinner || checkEndGame(newBoard);

  if (gameEnded || newWinner) {
    confetti()

    setWinner(newWinner)
    updateDoc(gamesCollection, {
      board: newBoard,
      turn: newTurn,
      winner: newWinner || false
    });
  } else if (checkEndGame(newBoard)) {
    setWinner(false)


  } else {
    updateDoc(gamesCollection, {
      board: newBoard,
      turn: newTurn
    });
  }
};

export {
  resetGame,
  updateBoard
}