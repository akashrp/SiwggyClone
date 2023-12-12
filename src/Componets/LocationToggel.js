import axios from "axios";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { GET_LOCATION_CORTDINATE, LOCATIONS_URL } from "../Uitils/APILinks";
import { CiLocationOn } from "react-icons/ci";
import { clearLocation,setLocation,setLocationGemotery,clearLocationGeometry } from "../slices/locationSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const LocationToggel =({setShowToggle})=>
{

const [searchInput,setSearchInput]=useState("");
const [Locations,setLocations]=useState([]);
const [isLocationLoading,setIsLocationLoading]=useState(false);
const dispatch= useDispatch();
const navigate = useNavigate();
useEffect(()=>
{
        const delayDebounceFn = setTimeout(()=>{
            if(searchInput)
            {
                getLocations()
            }
            else{
                setLocations([])
            }
        },1000)
    return () => clearTimeout(delayDebounceFn);
},
[searchInput])

const getLocations =async()=>
{
    setIsLocationLoading(true)
    let result = await axios.get(LOCATIONS_URL+ searchInput)
    let tempLocations=result.data?.data
    if(tempLocations &&tempLocations.length>0)
    {
        setLocations(tempLocations)
    }
    else{
        setLocations([])
    }
    setIsLocationLoading(false);
}
const handleSearchChange=(value)=>
{
        setSearchInput(value)
}
const getLocationCoordinates=async(location)=>
{
    let result= await axios.get(GET_LOCATION_CORTDINATE+location.place_id)
    if(result.data.data)
    {
        dispatch(clearLocation)
        dispatch(clearLocationGeometry)
        dispatch(setLocationGemotery(result.data?.data[0]?.geometry?.location))
        dispatch(setLocation(location.structured_formatting));
        setShowToggle(false);
        navigate("/");
    }
}
  return(
    <div className="md:w-1/3 w-screen h-screen fixed z-50 top-0 left-0 border bg-white border-black">
        <div className="flex flex-col p-5">
        <RxCross1 className="cursor-pointer" onClick={()=>setShowToggle(false)}/>
        <input onChange={(e)=>handleSearchChange(e.target.value)} className="mt-5 border border-black shadow-md w-full h-10 px-1" placeholder="Search for area,street name..."></input>
        </div>
        <div className="flex flex-col p-5">
        {
            isLocationLoading?<div>Fetching Locations....</div>:
             Locations.length>0&&
            
            Locations.map((locataion)=>{
                return(
                    <div className="flex flex-row items-baseline mt-3 cursor-pointer" onClick={()=>getLocationCoordinates(locataion)} key={locataion.place_id}>
                        <CiLocationOn className="basis-1/12"></CiLocationOn>
                        <div className="flex flex-col ml-2 pb-3 border-b border-dashed border-gray-500 basis-11/12">
                            <span className="text-base font-bold">{locataion.structured_formatting?.main_text}</span>
                            <span className="text-xs text-gray-500 ">{locataion.structured_formatting?.secondary_text}</span>
                        </div>
                    </div>
                )
            })
            
        }
        </div>
       
    </div>
  )
}
export default LocationToggel;