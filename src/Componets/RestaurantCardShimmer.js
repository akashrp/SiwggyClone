
const RestaurantCardShimmer =()=>
{
    return(
        <div className="w-60  flex flex-col cursor-pointer max-w-45">
        <div className=" animate-pulse rounded-2xl w-full h-40 shadow-inner shadow-black" >
    
        </div>
        <span className="pl-3 pt-3 font-bold bg-slate-200 w-3/4  truncate text-lg text-gray-800 h-2 mt-2">
         
        </span>
        <div className="flex pl-3 bg-slate-200 items-center w-1/2 h-3 mt-1">
          
          <span className="ml-2 bg-slate-200 text-gray-800 w-1/2 h-3 mt-1"></span>
        </div>
        <span className="pl-3 w-full  bg-slate-200 truncate text-gray-600 h-3 mt-1">
        
        </span>
        <span className="pl-3 bg-slate-200 w-full truncate text-gray-600  h-3 mt-1">
        </span>
      </div>
    )
   
}
export default RestaurantCardShimmer