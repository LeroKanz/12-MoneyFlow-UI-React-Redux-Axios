import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        status: null,
        error: null
    },
    reducers: {
        addCategory(state, action) {
            state.categories.push(action.payload);
        },
        updateCategory(state, action) {            
            state.categories.pop(category => category.id == action.payload.id);
            state.categories.push(action.payload);
        },
        removeCategory(state, action) {
            state.categories = state.categories.filter(category => category.id !== action.payload.id);
        },
        getAllCategories(state, action) {
            state.categories = action.payload
        },
    }
});

export const { addCategory, updateCategory, removeCategory, getAllCategories } = categorySlice.actions;

export default categorySlice.reducer;