import { useRef, useState } from "react";
import { Restaurant_Image_API } from "../Uitils/APILinks";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
const WhatsOnYourMind=({dishes})=>
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
          What's on your mind?
        </span>
        <div className="flex select-none">
            <FaArrowLeft className='cursor-pointer'onClick={scrollLeft}></FaArrowLeft>
            <FaArrowRight className="ml-3 cursor-pointer" onClick={scrollRight}></FaArrowRight>
        </div>
    </div>
      
      <div ref={offerDivRef} className="flex flex-nowrap overflow-x-auto mt-5 scroll-smooth no-scrollbar">
        {dishes.map(dish=>{
            return(<img key={dish.id} src={Restaurant_Image_API+dish.imageId} className="mr-4 w-28" />)
        })}
      </div>
    </div>
  );
}
export default WhatsOnYourMind