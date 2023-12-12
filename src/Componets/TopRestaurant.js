import { useRef, useState } from "react";
import { Restaurant_Image_API } from "../Uitils/APILinks";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";

const TopRestaurant =({Restaurants,title})=>
{
    const offerDivRef= useRef(null);
    const scrollLeft=()=>
    {
        offerDivRef.current.scrollLeft -=80;
    }
    const scrollRight=()=>
    {
        offerDivRef.current.scrollLeft+=80;
    }
    return (
        <div className="flex flex-col">
        <div className="flex justify-between">
            <span className=" text-gray-700 font-bold text-xl">
               {title}
            </span>
            <div className="flex select-none">
                <FaArrowLeft className='cursor-pointer'onClick={scrollLeft}></FaArrowLeft>
                <FaArrowRight className="ml-3 cursor-pointer" onClick={scrollRight}></FaArrowRight>
            </div>
        </div>
          
          <div ref={offerDivRef} className="flex flex-nowrap overflow-x-auto mt-5 scroll-smooth no-scrollbar">
            {Restaurants.map(res=>{
                return((
                  <Link className="mr-5" key={'Top_Res_'+res.info.id} to={`/menu/${res.info.id}`}>
                <RestaurantCard  ResInfo={res} />
                 </Link>
                 ))
            })}
          </div>
        </div>
      );
}
export default TopRestaurant