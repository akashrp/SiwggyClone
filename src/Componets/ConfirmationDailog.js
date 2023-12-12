const ConfrimationDialog =(props)=>
{
    const onYesClick= props.onYesClick;
    const onNoClick = props.OnNoClick;
    return(
     
       <div className="fixed inset-x-0 bottom-0.5 flex items-center justify-center z-50">
            <div className="bg-white w-1/3 border  ml-2 p-2 flex flex-col max-[450px]:w-full shadow-xl">
                <div className="flex-1 p-2 font-bold text-left">Items already in cart</div>
                <div className="flex-1 p-2 text-left">Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</div>
                <div className="flex-1 flex p-2">
                  
                    <button className="border border-green-500 mt-2 mb-2 p-2 w-1/2 text-green-500 font-bold" onClick={props.onNoClick} >No</button>
                    <button className="bg-green-500 text-white font-bold border border-green-500 m-2 p-2 w-1/2"  onClick={props.onYesClick}>Yes, Start Fresh</button>
                </div>
            </div>
        </div>
    );
}
export default ConfrimationDialog;