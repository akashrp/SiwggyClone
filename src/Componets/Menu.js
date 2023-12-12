// import React from "react";
import { useState } from "react"
// import { useState } from "react"
import{BsChevronDown} from "react-icons/bs"
import{BsChevronUp} from "react-icons/bs"
import DishCard from "./DishCard";
const Menu =(props)=>
{
 const [openAccordion,setOpenAccordion] = useState(false); 
 const {title,itemCards}=props.ItemCategory
 const type = props.ItemCategory["@type"]?.split(".").pop()
 
 return(
        <>
            <div onClick={()=>{setOpenAccordion(!openAccordion)}} className={"flex justify-between w-full py-6 cursor-pointer  " + (type=="ItemCategory"? "items-center text-gray-700  text-lg":"border-b-2  text-gray-800 py-4 last:border-0")}>
                <span className={type=="ItemCategory"?"text-sm sm:text-lg font-bold text-ellipsis overflow-clip text-start":"text-sm"}>{title}
                <span>{` (${itemCards.length})`}</span>
                </span>
              {  openAccordion?<BsChevronUp/>: <BsChevronDown  />}
            </div>
            {openAccordion &&
            <div className="flex flex-col">
                {
                    itemCards.map((item)=>{
                    return <DishCard key={item.card.info.id} Dish={item}></DishCard>
                    })
                }
            </div>}
        </>
    )
}
export default Menu