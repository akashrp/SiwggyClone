import react from "react";
import  ReactDOM  from "react-dom/client";
import App from "./src/Componets/App";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Body from "./src/Componets/Body";
import RestaurantDetails from "./src/Componets/RestautrantDetails"


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
        }
    ]

    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={appRouter} />
)

