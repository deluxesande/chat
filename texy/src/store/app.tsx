// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { chatsApi } from "./chatApiSlice";

const store = configureStore({
    reducer: {
        [chatsApi.reducerPath]: chatsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(chatsApi.middleware),
});

export default store;
