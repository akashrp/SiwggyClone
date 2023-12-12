///import axios from "axios";
import axios from "axios";
import { useEffect, useState ,useContext} from "react";
import { useParams } from "react-router-dom";
import { Restaurant_Menu_API } from "../Uitils/APILinks";
import OfferCard from "./OfferCard";
import MenuAccordion from "./MenuAccordion";
import{BsChevronDown} from "react-icons/bs"
import Menu from "./Menu";
import RestaurantContext from "../Uitils/RestaurantContext";

const RestaurantDetails=()=>
{
    const {RestaurantId} = useParams();
    const [resutarantData,setRestaurantData]=useState([]);
     const {setResDetails}=useContext(RestaurantContext)
    useEffect(()=>{
      getRestaurantMenuData();
    },[])
    
    const getRestaurantMenuData = async()=>{
        let result = await axios.get(Restaurant_Menu_API+RestaurantId)
        setRestaurantData(result.data.data.cards); 
        setResDetails(result.data.data.cards.find(x=>x.card.card["@type"]=="type.googleapis.com/swiggy.presentation.food.v2.Restaurant").card.card.info);
    }

    return(
      
         <div className="flex flex-col text-center w-4/5 sm:w-1/2 m-auto mt-9">
          {
                resutarantData.length>0 &&
                <div className="flex flex-col">
                    <div className="flex justify-between">
                     <div className="flex flex-col text-left">
                        <span className="font-bold text-lg">
                            {resutarantData[0].card?.card?.info?.name}
                        </span>
                        <span className="text-xs pt-2 text-gray-500">
                            {resutarantData[0].card?.card?.info?.cuisines.join(",")}
                        </span>
                        <span className="text-xs pt-2 text-gray-500">
                            {resutarantData[0].card?.card?.info?.areaName}
                            {
                                  resutarantData[0].card?.card?.info?.sla?.lastMileTravelString && +  resutarantData[0].card?.card?.info?.sla?.lastMileTravelString!=""&&
                                  <span>
                                   { ", "}  {resutarantData[0].card?.card?.info?.sla?.lastMileTravelString}
                                  </span>
                            }

                        </span>
                     </div>
                    <div className="flex flex-col border py-3 px-2 rounded-md">
                        <span className="text-sm border-b border-gray-300 pb-2 text-green-700 font-bold">
                        {resutarantData[0].card?.card?.info?.avgRatingString}
                        </span>
                        <span className="text-xs pt-2 font-bold text-gray-500">
                        {resutarantData[0].card?.card?.info?.totalRatingsString}
                        </span>
                    </div>                    
                    </div>
                  
                    <div className="w-full text-left mt-2 border-dashed border-b border-gray-300 pb-3">
                    {resutarantData[0].card?.card?.info?.expectationNotifiers && resutarantData[0].card?.card?.info?.expectationNotifiers.length>0&&
                     <span className="text-sm pt-2 text-gray-500">{resutarantData[0].card?.card?.info?.expectationNotifiers[0]?.text}</span>
                    }
                     </div>
                    
                    <div className="w-full text-left mt-2 pb-5">
                        <span className="font-bold text-sm text-gray-700">
                        {resutarantData[0].card?.card?.info?.sla?.slaString}
                        </span>
                        <span className="font-bold text-sm text-gray-700 ml-5 py-4">
                        {resutarantData[0].card?.card?.info?.costForTwoMessage}
                        </span>
                    </div>
                    {
                        resutarantData.find(x=>x.card?.card?.id =="offerCollectionWidget_UX4") &&
                        resutarantData.find(x=>x.card?.card?.id =="offerCollectionWidget_UX4").card?.card?.gridElements?.infoWithStyle?.offers.length>0
                        &&
                        <div className="w-full flex flex-nowrap overflow-x-auto space-x-3">
                            {
                                resutarantData.find(x=>x.card?.card?.id =="offerCollectionWidget_UX4").card?.card?.gridElements?.infoWithStyle?.offers.map(
                                    (offer)=>
                                    {
                                      return <OfferCard key ={offer.info.offerIds[0]} Offer={offer}></OfferCard>
                                    }
                                )
                            }
                        </div>
                    }
                    {
                           resutarantData.find(x=>x.hasOwnProperty("groupedCard"))&&
                           resutarantData.find(x=>x.hasOwnProperty("groupedCard")).groupedCard?.cardGroupMap["REGULAR"]?.cards.length>0&&
                           resutarantData.find(x=>x.hasOwnProperty("groupedCard")).groupedCard?.cardGroupMap["REGULAR"]?.cards.map((item)=>{
                                if(item.card.card["@type"].includes("ItemCategory"))
                                {
                                    return(
                                    item.card.card["@type"]=="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"?
                                    <div key={item.card.card.title} className="w-full border-b-8 border-gray-200 last:border-0">
                                         
                                           <Menu  ItemCategory={item.card.card}></Menu>
                                    </div>
                                     :
                                     <div key={item.card.card.title} className="flex flex-col w-full py-6 border-b-8 border-gray-200  text-gray-700 cursor-pointer text-lg ">
                                         <span className="font-bold text-left">{item.card.card.title}</span>
                                         {
                                          item.card.card.categories.map((item)=>{
                                             return(                                                                                  
                                                      <Menu key={item.title} ItemCategory={item}></Menu>
                                             );
                                           })
                                         }
                                     </div>) 
                                    //return <MenuAccordion key={item.card.card.title} MenuItem={item}></MenuAccordion>
                                }
                           })


                    }
                </div>
           }
        </div>
    )
}
export default RestaurantDetails;