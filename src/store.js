import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import currentRestaurantReducer from "./slices/currentRestaurantSlice"
import locationReducer from "./slices/locationSlice"
const store =configureStore({
 reducer:{
    cart:cartReducer,
    currentRestaurant:currentRestaurantReducer,
    location:locationReducer
 }
})

export default store;