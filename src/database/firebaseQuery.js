import { arrayUnion, deleteDoc, doc, getDoc, setDoc, updateDoc, } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { TURNS } from "../constans";



const board = Array(9).fill(null);
const turn = TURNS.X;
const winner = null;


const saveNicknameToFirebase = async (nickname, code) => {
    const docRef = doc(db, "nicknames", code);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        await updateDoc(doc(db, 'nicknames', code), {
            nick: arrayUnion(nickname)
        });
    } else {
        await setDoc(doc(db, 'nicknames', code), {
            nick: arrayUnion(nickname)
        });
    }
}


const saveGameCode = async (roomCode) => {
    await setDoc(doc(db, "games", roomCode), {
        board,
        turn,
        winner
    });
};


const getGameData = async (code) => {
    const gameRef = doc(db, "games", code);
    const gameSnap = await getDoc(gameRef);
    return gameSnap;
};


const deleteGameData = async (roomCode) => {
    await deleteDoc(doc(db, 'games', roomCode))
    await deleteDoc(doc(db, 'nicknames', roomCode))
}


export {
    saveGameCode,
    saveNicknameToFirebase,
    getGameData,
    deleteGameData
}