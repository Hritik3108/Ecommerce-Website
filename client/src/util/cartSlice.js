import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState: {
        items: [],
    },
    reducers:{
        addItem: (state,action) => {
            const item = state.items.find((item)=>item._id==action.payload._id);
            !item?
            state.items.push({...action.payload,quantity:1})
            :
            item.quantity++;
        },
        removeItem: (state, action) => {
            const item = state.items.find((item) => item._id == action.payload._id);
            item.quantity--;
            if (item.quantity == 0) {
                const arr = state.items.filter(item => item._id !== action.payload._id);
                state.items = arr;
            }
        },
        removeallItem: (state, action) => {
            const arr = state.items.filter(item => item._id !== action.payload._id);
            state.items = arr;
        },
        clearCart: (state, action) => {
            state.items=[];
        },
        quantityOfItem: (state, action) => {
            const item = state.items.find((item) => item._id == action.payload._id);
            item.quantity=action.payload.quantity;
        }, 
        
    }
});

export const {addItem, removeItem, clearCart,removeallItem,quantityOfItem} = cartSlice.actions;

export default cartSlice.reducer;