import { createSlice } from "@reduxjs/toolkit";

const currentRestaurantSlice = createSlice({
    name:"currentRestaurant",
    initialState:{
        currentRestaurant:{}
    },
    reducers:
    {
        setCurrentRestaurant:(state,action)=>
        {
            state.currentRestaurant=action.payload
        },
        clearCurrentRestaurant:(state,action)=>
        {
            state.currentRestaurant={}
        }
    }
})
export const {setCurrentRestaurant,clearCurrentRestaurant}=currentRestaurantSlice.actions;
export default currentRestaurantSlice.reducer     