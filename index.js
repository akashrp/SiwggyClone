import react from "react";
import  ReactDOM  from "react-dom/client";
import App from "./src/Componets/App";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Body from "./src/Componets/Body";
import RestaurantDetails from "./src/Componets/RestautrantDetails"
import CheckOut from "./src/Componets/CheckOut";
import AboutUs from "./src/Componets/AboutUs";

const appRouter = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
        {
            path:'/',
            element:<Body/>
        },
        {
            path: '/menu/:RestaurantId',
            element:<RestaurantDetails/>
        },
        {
            path:"/checkout",
            element:<CheckOut/> 
        },
        {
            path:"/AboutUs",
            element:<AboutUs/>
        }
    ]

    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={appRouter} />
)

