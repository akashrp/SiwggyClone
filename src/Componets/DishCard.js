import { Dish_Image_API } from "../Uitils/APILinks";

const DishCard =(props)=>{
    console.log(props.Dish)
    const{name,price,description,isVeg,showImage,imageId,defaultPrice}=props.Dish?.card?.info
  return(
    <div className="flex w-full border-b last:border-none py-6">
        <div className="flex w-full justify-between">
            <div className="flex flex-col items-start">
               <div className={"rounded-full w-2 h-2 py-1 "+ ( isVeg==1?"bg-green-600":"bg-red-700 ")}></div>
                <span className="pt-2 font-bold text-gray-600 text-left">{name.trim()}</span>
                <span className="text-gray-500 text-base">{"₹"+ (price?price/100:defaultPrice/100)}</span>
                <span className="py-2 text-left text-sm text-gray-400">{description && description.trim()}</span>
            </div>
            <div>
            <div className= "w-32">
                {
                      
                    <div className="relative w-full"> 
                       {imageId && imageId!=""&& <img className="w-full rounded-md" src={Dish_Image_API+imageId}></img>}
                        <button className="absolute left-6 px-6 bg-gray-50 top-3/4 border-gray-400  border rounded-md py-1 text-sm text-green-400 font-bold"> ADD</button>
                    </div> 
                }
              
            </div>    

            </div>
        </div>
    </div>
  )
}
export default DishCard;