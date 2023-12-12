import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
    name:'location',
    initialState:{
        geometry:{},
        location:{}
    },
    reducers:
    {
        setLocationGemotery:(state,action)=>
        {
            state.geometry=action.payload
        },
        clearLocationGeometry:(state,action)=>
        {
            state.geometry={};
        },
        setLocation:(state,action)=>
        {
            state.location=action.payload
        },
        clearLocation:(state,action)=>
        {
            state.location={}
        }
    }
});
export const{setLocation,clearLocation,setLocationGemotery,clearLocationGeometry}=locationSlice.actions;
export default locationSlice.reducer;