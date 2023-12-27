import { createSlice } from '@reduxjs/toolkit';

export const nickSlice = createSlice({
    name: 'nick',
    initialState: {
        nickName: null
    },
    reducers: {
        saveNickname: (state, action) => {
            state.nickName = action.payload;
        },
    }
});
export const { saveNickname } = nickSlice.actions;