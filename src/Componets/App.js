import React from "react";
import NavBar from "./NavBar"
import Body from "./Body"
import { Outlet } from "react-router-dom";
const App =()=>
{
    return(
    <div>
        <NavBar></NavBar>
        <Outlet/>
    </div>
    )
}
export default App;