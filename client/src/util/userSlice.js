import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState: {
        user:{},
        token:"",
        sessionActive:false,
        orders:[]
    },
    reducers:{
        addUser: (state,action) => {
            // console.log(action.payload.user);
           state.user={...action.payload.user};
           state.orders=action.payload.user.orders;
           state.token=action.payload.accessToken;
           state.sessionActive=true;
        },
        updateUser: (state,action) => {
            state.user={...action.payload}; 
        },
        logoutUser: (state, action) => {
           state.user={};
           state.token="";
           state.sessionActive=false;
        },
        updateOrders: (state, action) => {
            state.orders=[...action.payload]
        },
        
    }
});

export const {addUser, logoutUser,updateUser,updateOrders} = userSlice.actions;

export default userSlice.reducer;