import {FcRating} from "react-icons/fc"
import { Restaurant_Image_API } from "../Uitils/APILinks";
const RestaurantCard =(props)=>
{
 const {name, avgRating,areaName,cuisines,cloudinaryImageId} = props?.ResInfo.info;

 return(
    <div className="w-60  flex flex-col cursor-pointer max-w-45">
       <img className="rounded-2xl w-full h-40 shadow-inner shadow-black" src={Restaurant_Image_API+cloudinaryImageId}/>
       <span className="pl-3 pt-3 font-bold  w-full  truncate text-lg text-gray-800">{name}</span>
       <div className="flex pl-3 items-center">
      <FcRating/>
       <span className="ml-2 text-gray-800">{avgRating}</span>
       </div>
       <span className="pl-3 w-full  truncate text-gray-600">{cuisines.join(",")}</span>
       <span className="pl-3 w-full truncate text-gray-600">{areaName}</span>
    </div>
 );
}
export default RestaurantCard