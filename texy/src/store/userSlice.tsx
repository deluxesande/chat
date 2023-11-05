import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "User",
    initialState: {
        user: null,
        token: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload;
            (state.user = user), (state.token = accessToken);
        },
        logOut: (state) => {
            (state.user = null), (state.token = null);
        },
    },
});

export const userActions = userSlice.actions;
export default userSlice;
