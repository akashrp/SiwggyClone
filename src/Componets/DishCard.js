import { Dish_Image_API } from "../Uitils/APILinks";
import { useDispatch } from "react-redux";
import {addItem,clearCart, removeItem} from '../slices/cartSlice'
import { setCurrentRestaurant } from "../slices/currentRestaurantSlice";
import { clearCurrentRestaurant } from "../slices/currentRestaurantSlice";
import { useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import RestaurantContext from "../Uitils/RestaurantContext";
import ConfrimationDialog from "./ConfirmationDailog"
import { useState } from "react";
import vegIcon from '../../assets/vegIcon.png'
import nonVegIcon from '../../assets/nonVegIcon.png'
const DishCard =(props)=>{
  const{name,price,description,isVeg,showImage,imageId,defaultPrice,id}=props.Dish?.card?.info
  const dispatch = useDispatch();
  const {resDetails} = useContext(RestaurantContext)
  const currentRestaurant= useSelector((store)=>store.currentRestaurant.currentRestaurant);
  const cartItems = useSelector((store)=>store.cart.items);
  const [openConfirmation,setOpenConfirmation] = useState(false);
  const [dishCount,setDishCount] =useState(0);

  useEffect(()=>
  {    
    calculateDishCount();   
  },[cartItems])

  const calculateDishCount =()=>
  {
   if (cartItems && cartItems.length>0)
   {
    let dish =  cartItems.filter(x=>x.info?.id==id);
    if(dish && dish.length>0)
    {
     setDishCount(dish.length);
    }
    else 
    {
        setDishCount(0);    
    }
   }
   else 
    {
        setDishCount(0);    
        dispatch(clearCurrentRestaurant());
    }    
  }
  const onYesClick =() =>
  {
    dispatch(clearCart());
    dispatch(clearCurrentRestaurant());
    dispatch(addItem(props.Dish?.card));
    dispatch(setCurrentRestaurant(resDetails))
    setOpenConfirmation(false);
  }
  const onNoClick=()=>
  {
    setOpenConfirmation(false);
  }
 
  const addDish =()=>
  {
    
    if(currentRestaurant && currentRestaurant.id==resDetails.id)
    {
        dispatch(addItem(props.Dish?.card));
        dispatch(setCurrentRestaurant(resDetails))
    }  
    else if(!currentRestaurant.id)
    {
        dispatch(addItem(props.Dish?.card));
        dispatch(setCurrentRestaurant(resDetails));
    }
    else
    {
        setOpenConfirmation(true)
    }
       
  }
  const incrementDishCount=()=>
  {
    dispatch(addItem(props.Dish?.card));
  }
  const decrementDishCount =()=>
  {
    dispatch(removeItem(id))
  }
    
  return(
    <>
    <div className="flex w-full border-b last:border-none py-6">
        <div className="flex w-full justify-between">
            <div className="flex flex-col items-start">
              <img className="w-5" src={isVeg==1?vegIcon:nonVegIcon}></img>
                <span className="pt-2 font-bold text-gray-600 text-left">{name.trim()}</span>
                <span className="text-gray-500 text-base">{"₹"+ (price?price/100:defaultPrice/100)}</span>
                <span className="py-2 text-left text-sm text-gray-400">{description && description.trim()}</span>
            </div>
            <div>
            <div className= "w-32">
                {
                      
                    <div className="relative w-full"> 
                       {imageId && imageId!=""&& <img className="w-full rounded-md" src={Dish_Image_API+imageId}></img>}
                        {   dishCount>0?
                            <div className="top-3/4 absolute left-6   flex  py-1 border-gray-400  border rounded-md text-sm justify-between bg-gray-50 font-bold">
                             <span className="mx-3 cursor-pointer text-gray-500" onClick={decrementDishCount}>-</span>
                            <span className="text-green-400">{dishCount}</span>
                            <span className= "mx-3 cursor-pointer text-green-400" onClick={incrementDishCount}>+</span>
                            </div>:
                            <button className="absolute left-6 px-6 bg-gray-50 top-3/4 border-gray-400  border rounded-md py-1 text-sm text-green-400 font-bold"
                            onClick={addDish}> ADD</button>
                        }
                    </div> 
                }
            </div>    

            </div>
        </div>
    </div>
    {
      openConfirmation &&
      <ConfrimationDialog onYesClick={onYesClick}  onNoClick={onNoClick}></ConfrimationDialog>

    }

    
   </> 
  )
}
export default DishCard;