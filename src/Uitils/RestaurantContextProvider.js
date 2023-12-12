import { useState } from "react"
import RestaurantContext from "./RestaurantContext";

const RestaurantContextProvider =({children})=>
{
 const [resDetails, setResDetails]= useState(null);
 return(
    <RestaurantContext.Provider value={{resDetails,setResDetails}}>
        {children}
    </RestaurantContext.Provider>
 );
}
export default RestaurantContextProvider