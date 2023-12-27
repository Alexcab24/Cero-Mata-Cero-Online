import { configureStore } from "@reduxjs/toolkit";
import { roomSlice } from "./room/roomSlice";
import { nickSlice } from "./nickname/nickSlice";

export const store = configureStore({
    reducer: {
    room: roomSlice.reducer,
    nick: nickSlice.reducer
    },
})