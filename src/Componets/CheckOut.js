import { useDispatch, useSelector } from "react-redux";
import RestaurantContext from "../Uitils/RestaurantContext";
import {Restaurant_Image_API } from "../Uitils/APILinks"
import { useEffect, useState } from "react";
import { clearCart } from "../slices/cartSlice";
import { clearCurrentRestaurant } from "../slices/currentRestaurantSlice";
import cart from '../../assets/emptyCart2.png'
import placedOrder from '../../assets/orderPlaced.gif'
import {addItem,clearCart, removeItem} from '../slices/cartSlice'
import vegIcon from '../../assets/vegIcon.png'
import nonVegIcon from '../../assets/nonVegIcon.png'
const CheckOut =()=>
{
    
    const cartItems= useSelector((store)=>store.cart.items) 

    const currentRestaurant = useSelector((store)=>store.currentRestaurant)
    
    const [items,setItems] = useState([]);
    const [isOrderPlaced,setIsOrderPlaced]=useState(false)
    useEffect(()=>{
     setCartItems();
    },[cartItems])
    const dispatch = useDispatch();
    const setCartItems =()=>
    {
        if(cartItems && cartItems.length>0)
        {
            let tempItemArray =[];
            cartItems.forEach(element => {
                if(tempItemArray.length==0)
                {
                    let tempItem ={
                        dishInfo:element,
                        dishCount:1
                    }
                    tempItemArray.push(tempItem)
                }
                else
                {
                    let existingItem =tempItemArray.find(x=>x.dishInfo.info.id==element.info.id)
                    if(!existingItem)
                    {
                        let tempItem ={
                            dishInfo:element,
                            dishCount:1
                        }
                        tempItemArray.push(tempItem)
                    }
                    else
                    {
                        existingItem.dishCount= existingItem.dishCount+1;
                    }
                }
            });
            setItems(tempItemArray)
        }
        else
        {
            setItems([])
        }
    }
    const decrementDishCount=(id)=>{
        dispatch(removeItem(id))
    }
    const  incrementDishCount=(item)=>
    {
        dispatch(addItem(item));
    }
    const calculateItemPrice =(count,price)=>
    {
       return (count*price)/100
    }
    const OnClearCart =()=>
    {
      dispatch(clearCart());
      dispatch(clearCurrentRestaurant());
    }
    const getTotalPrice =()=>
    {
        let total =0;
        items.forEach(item=>{
            let price = item.dishInfo.info.price?item.dishInfo.info.price:item.dishInfo.info.defaultPrice
            total = price*item.dishCount+total
        })
        return total/100;
    }
    const getPayablePrice =()=>
    {
        return getTotalPrice()+50+3
    }
    const PlaceOrder =()=>
    {
        setIsOrderPlaced(true);
        OnClearCart();
    }
    return(<div className="w-full justify-center mt-4">
        {
            items.length>0?
            <div className="flex w-full justify-center">
                <div className="flex flex-col w-full sm:w-1/2 border p-5">
                    <div className="flex justify-between items-center">
                        <div className="flex">
                            <img className="w-12" src={Restaurant_Image_API+currentRestaurant.currentRestaurant.cloudinaryImageId}/>
                            <span className="font-bold text-base ml-4 border-b-2 border-black pb-1">{currentRestaurant.currentRestaurant.name}<br/><span className="text-sm">{currentRestaurant.currentRestaurant.areaName}</span></span>
                        </div>
                       <button onClick={OnClearCart} className="px-3 py-1 border-2 rounded-md h-7 md:h-11 w-24 text-xs md:w-32 md:text-base bg-slate-400 text-white border-slate-400">Clear Cart</button>
                    </div>
                    <div className="flex flex-col h-72 overflow-y-auto mt-6 ">
                        {
                            items.map(item=>{
                                return(
                                    <div className="flex flex-row items-center mt-3"  key={item.dishInfo.info.id} >
                                    <div className="text-sm font-bold text-gray-600 text-left basis-1/3 flex items-center">
                                        <img className="w-5 mr-1" src={item.dishInfo.info.isVeg==1?vegIcon:nonVegIcon} />
                                      < span >{item.dishInfo.info.name.trim()}</span>
                                    </div>
                                    
                                     <div className="flex  py-2 border border-gray-400  text-sm justify-between  font-bold ml-8 basis-1/3">
                                         <span className=" mx-4 cursor-pointer text-gray-500" onClick={()=>{decrementDishCount(item.dishInfo.info.id)}}>-</span>
                                         <span className="text-green-400">{item.dishCount}</span>
                                         <span className= "mx-4 cursor-pointer text-green-400" onClick={()=>{incrementDishCount(item.dishInfo)}}>+</span>
                                      </div> 
                                      <span className="ml-3 pr-5 text-right basis-1/3">{"₹"+ (item.dishInfo.info.price?calculateItemPrice(item.dishCount,item.dishInfo.info.price):calculateItemPrice(item.dishCount,item.dishInfo.info.defaultPrice))}</span>                         
                                    </div>
                                )
                            })
                        }
                        <span className="text-sm font-bold mt-7">Bill Details</span>
                        <div className="flex mt-2">
                            <span className="text-sm text-gray-500 basis-1/3">Item Total</span>
                            <span className="basis-1/3 ml-8"></span>
                            <span className="text-sm text-gray-500 basis-1/3 ml-3 pr-5 text-right" >{'₹' + getTotalPrice()}</span>
                        </div>
                        <div className="flex mt-2 border-b border-gray-300 pb-5">
                            <span className="text-sm text-gray-500 basis-1/3">Delivery fee</span>
                            <span className="basis-1/3 ml-8"></span>
                            <span className="text-sm text-gray-500 basis-1/3  ml-3 pr-5 text-right" >{'₹' +'50'}</span>
                        </div>
                        <div className="flex mt-4">
                            <span className="text-sm text-gray-500 basis-1/3">Platform fee</span>
                            <span className="basis-1/3 ml-8"></span>
                            <span className="text-sm text-gray-500 basis-1/3 ml-3 pr-5 text-right" >{'₹' + '3'}</span>
                        </div>
                        <div className="flex mt-2 pb-5 border-b-2 border-black">
                            <span className="text-sm text-gray-500 basis-1/3">GST</span>
                            <span className="basis-1/3 ml-8"></span>
                            <span className="text-sm text-gray-500 basis-1/3 ml-3 pr-5 text-right" >{'₹' + '0'}</span>
                        </div>
                    </div>
                    <div className="flex justify-between pr-5 mt-5">
                        <span className="font-bold text-base">To Pay</span>
                        <span className="font-bold text-base">{'₹'+getPayablePrice()}</span>
                    </div>
                    <div className="flex justify-center mt-5">
                        <button className="text-black bg-orange-400 w-48 h-9" onClick={PlaceOrder}>Place Order</button>
                    </div>
                </div>
            </div>:
          isOrderPlaced?
          <div className="flex justify-center flex-col items-center">
            <img className=" w-1/4" src={placedOrder}></img>
            <span className="font-bold text-lg mt-3">  Thank you for ordering.</span>
            <span className="font-bold text-lg mt-3 text-center"> Your order will reach you in approximately 30 mins</span>
          </div>:
            <div className="flex justify-center flex-col items-center">
                <img className=" w-1/4" src={cart}></img>
                <span className="font-bold text-xl mt-3">Your cart is empty</span>
                <span className="text-sm">You can go to home page to view more restaurants</span>
            </div>
        }
    </div>)
}
export default CheckOut;