import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name:"products",
    initialState: {
        product: [],
        searchValue:"",
    },
    reducers:{
        loadProducts: (state,action) => {
            state.product = [...action.payload];
        },
        clearProducts: (state, action) => {
            state.product=[];
        },
        setSearch: (state, action) => {
            state.searchValue=action.payload;
        }
       
    }
});

export const {
    loadProducts, 
    clearProducts, 
    setSearch,
} = productsSlice.actions;

export default productsSlice.reducer;