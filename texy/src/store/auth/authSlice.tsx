import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const user = JSON.parse(localStorage.getItem("user"));

type User = {
    username: string;
    email: string;
    password: string;
};

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

// Login user
export const register = createAsyncThunk(
    "auth/register",
    async (user: User, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (err) {
            const message =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                state.message = action.payload;
                state.user = null;
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
