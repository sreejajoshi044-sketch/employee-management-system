import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient.js";


// =========================================
// LOGIN
// =========================================

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (loginData, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post(
                "/auth/login",
                loginData
            );

            return response.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Login failed. Please try again."
            );
        }
    }
);


// =========================================
// INITIAL STATE
// =========================================

const initialState = {
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: Boolean(
        localStorage.getItem("token")
    ),
    loading: false,
    error: null
};


// =========================================
// AUTH SLICE
// =========================================

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {

        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;

            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },

        clearAuthError: (state) => {
            state.error = null;
        }

    },

    extraReducers: (builder) => {

        builder

            // Login started
            .addCase(
                loginUser.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            // Login successful
            .addCase(
                loginUser.fulfilled,
                (state, action) => {

                    state.loading = false;
                    state.isAuthenticated = true;

                    state.token =
                        action.payload.token;

                    state.user =
                        action.payload.user || null;

                    localStorage.setItem(
                        "token",
                        action.payload.token
                    );

                    if (action.payload.user) {
                        localStorage.setItem(
                            "user",
                            JSON.stringify(
                                action.payload.user
                            )
                        );
                    }
                }
            )

            // Login failed
            .addCase(
                loginUser.rejected,
                (state, action) => {
                    state.loading = false;
                    state.isAuthenticated = false;
                    state.token = null;
                    state.user = null;
                    state.error =
                        action.payload ||
                        "Login failed";
                }
            );
    }
});


// =========================================
// EXPORTS
// =========================================

export const {
    logout,
    clearAuthError
} = authSlice.actions;

export default authSlice.reducer;