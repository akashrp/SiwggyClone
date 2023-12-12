import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
    name:"cart",
    initialState:{
        items:[]
    },
    reducers:
    {
        addItem:(state,action)=>
        {
            state.items.push(action.payload);
        },
        removeItem:(state,action)=>
        {
           
           let tempIndex = state.items.findIndex(x=>x.info.id==action.payload);
           if(tempIndex>-1)
           {
            if(state.items.length>1) 
            {
             state.items.splice(tempIndex,1);
 
            }
            else
            {
                state.items.pop();  
            }
           }
           
        },
        clearCart:(state)=>
        {
            state.items.length=0;
        }
        
    }
})
export const {addItem,removeItem,clearCart}= cartSlice.actions;
export default cartSlice.reducer;