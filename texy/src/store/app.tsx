// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
