// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import userSlice from "./userSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
