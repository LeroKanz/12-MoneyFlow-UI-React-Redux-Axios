import { createSlice } from '@reduxjs/toolkit';

const accountSlice = createSlice({
    name: 'accounts',
    initialState: {
        accounts: [],
        status: null,
        error: null
    },
    reducers: {
        addAccount(state, action) {
            state.accounts.push(action.payload);
        },
        updateAccount(state, action) {            
            state.accounts.pop(account => account.id == action.payload.id);
            state.accounts.push(action.payload);
        },
        removeAccount(state, action) {
            state.accounts = state.accounts.filter(account => account.id !== action.payload.id);
        },
        getAllAccounts(state, action) {
            state.accounts = action.payload
        },
    }
});

export const { addAccount, updateAccount, removeAccount, getAllAccounts } = accountSlice.actions;

export default accountSlice.reducer;