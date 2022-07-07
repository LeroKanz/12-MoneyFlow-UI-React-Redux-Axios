import { createSlice } from '@reduxjs/toolkit';

const initialLoginState = {
    isAuth: false,
    token: "",
    refreshToken: ""
};

const loginSlice = createSlice({
    name: 'login',
    initialState: initialLoginState,
    reducers: {
        login(state, action) {
            state.isAuth = true;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
        },
        logout(state) {
            state.isAuth = false;
            state.token = "";
            state.refreshToken = "";
        }
    }
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
