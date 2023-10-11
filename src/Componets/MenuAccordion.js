import{BsChevronDown} from "react-icons/bs"
const MenuAccordion =(props)=>
{
    const categoryType= props.MenuItem.card?.card?.["@type"]
    const menuItem = props.MenuItem
    const{title}= props.MenuItem.card.card;
    const itemCards=props.MenuItem.card.card.itemCards
    console.log(props.MenuItem)
    return(
        <div>
            {
                categoryType == "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"?
               <>
                    <div className="flex justify-between w-full py-6 border-b-8 border-gray-200 items-center text-gray-700 cursor-pointer text-lg">
                        <span className="font-bold">{title}
                        <span>{` (${itemCards.length})`}</span>
                        </span>
                        <BsChevronDown/>
                    </div>
                    <div className="flex flex-col">
                       {
                         itemCards.map((item)=>{
                            return<div key={item.card.info.id}>{item.card.info.name}</div>
                         })
                       }
                    </div>
               </>
                :
                <div className="flex flex-col w-full py-6 border-b-8 border-gray-200  text-gray-700 cursor-pointer text-lg items-start">
                    <span className="font-bold">{title}</span>
                    {
                      menuItem.card.card.categories.map((item)=>{
                        return(
                            <>
                                <div className="flex justify-between w-full  border-b-2 last:border-0 text-gray-800 py-4">
                                    <span className="text-sm">{item.title}
                                    <span>{` (${item.itemCards.length})`}</span>
                                    </span>
                                    <BsChevronDown/>
                                </div>
                                <div className="flex flex-col">
                                    {
                                        item.itemCards.map((item)=>{
                                            return<div key={item.card.info.id}>{item.card.info.name}</div>
                                        })
                                    }
                                </div>
                            </>
                        );
                      })
                    }
                </div> 
            }
        </div>
    );
}
export default MenuAccordion