import { createSlice } from '@reduxjs/toolkit';
import { customAlphabet } from 'nanoid';
import { getGameData, saveGameCode } from '../../database/firebaseQuery';


export const roomSlice = createSlice({
    name: 'room',
    initialState: {
        code: null
    },
    reducers: {
        setGameCode: (state) => {
            const alphabet = '0123456789';
            const generateRandomCode = customAlphabet(alphabet, 4);
            const randomCode = generateRandomCode();
            state.code = randomCode;
            saveGameCode(state.code);
        },
        joinGameCode: (state, action) => {
            state.code = action.payload;
        },
        deleteGameCode: (state) => {
            state.code = null;
        }
    }
});
export const { setGameCode, joinGameCode, deleteGameCode } = roomSlice.actions;