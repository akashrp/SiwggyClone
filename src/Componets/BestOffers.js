import { useRef, useState } from "react";
import { Restaurant_Image_API } from "../Uitils/APILinks";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
const BestOffers = ({ offers }) => {
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
            Best Offers for you
        </span>
        <div className="flex select-none">
            <FaArrowLeft className='cursor-pointer'onClick={scrollLeft}></FaArrowLeft>
            <FaArrowRight className="ml-3 cursor-pointer" onClick={scrollRight}></FaArrowRight>
        </div>
    </div>
      
      <div ref={offerDivRef} className="flex flex-nowrap overflow-x-auto mt-5 scroll-smooth no-scrollbar">
        {offers.map(offer=>{
            return(<img key={offer.id} src={Restaurant_Image_API+offer.imageId} className="w-96 mr-4" />)
        })}
      </div>
    </div>
  );
};
export default BestOffers;
