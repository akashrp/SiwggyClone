import React from "react";
import NavBar from "./NavBar"
import Body from "./Body"
import { Outlet } from "react-router-dom";
import store from "../store";
import { Provider } from "react-redux";
import RestaurantContextProvider from "../Uitils/RestaurantContextProvider";
const App =()=>
{
    return(
     <Provider store={store}>  
    <div className="w-full">
        <NavBar></NavBar>
        <RestaurantContextProvider>
        <Outlet/>
        </RestaurantContextProvider>
    </div>
    </Provider> 
    )
}
export default App;