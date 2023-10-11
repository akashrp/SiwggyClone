import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import axios from "axios";
import { MAIN_PAGE_DATA_API } from "../Uitils/APILinks";
import { Link } from "react-router-dom";

const Body=()=>
{
    const [restaurantData, setRestaurantData] = useState([]);
    useEffect(()=>{
      getRestaurantData();
    },[]);
   
   const getRestaurantData =async()=>
   {
     let result = await axios.get(MAIN_PAGE_DATA_API);
     let tempRestaurantData = result?.data?.data?.cards?.find(x=>x.card.card.id=="restaurant_grid_listing")?.card?.card?.gridElements?.infoWithStyle?.restaurants;
     setRestaurantData(tempRestaurantData);
   }

    return(
    <div className="mt-8 mx-14 grid grid-cols-3 lg:grid-cols-4 gap-2 gap-y-2">
       {
         restaurantData.map((restaurant)=>{
          return (
          <Link key={restaurant.info.id} to={"/menu/"+restaurant.info.id}>
              <RestaurantCard  ResInfo= {restaurant}/>
          </Link>)
         })
       }      
    </div>
    );
}

export default Body