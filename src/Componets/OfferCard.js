import { OfferIcon } from "../Uitils/APILinks"

 const OfferCard = (props)=>
 {
   const {couponCode,header,description}=props.Offer.info;

    return(
       <div className="flex w-48 border-2 border-gray-400 rounded-md flex-col p-2 shrink-0">
        <div className="flex items-center w-full truncate">
            <img className="h-4" src={OfferIcon}></img>
            <span className="text-sm ml-2 text-gray-500 font-bold">{header}</span>
        </div>
        <div className="flex text-xs w-full truncate text-gray-400" title={`${couponCode} | ${description}`}>
            <span className="mr-1">{couponCode}</span>|<span className="ml-1">{description}</span>
        </div>
       </div>
    );
 }
 export default OfferCard