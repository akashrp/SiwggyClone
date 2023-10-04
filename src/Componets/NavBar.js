const NavBar =()=>
{
    return(
    <div className="flex w-full justify-between py-5 px-20 items-center shadow-lg ">
      <div className="flex w-7/12 items-center">
       <img className="h-12 cursor-pointer" src="https://seeklogo.com/images/S/swiggy-logo-8EF8260FA4-seeklogo.com.png"/>
       <span className="underline underline-offset-4 ml-10 hover:text-orange-600 cursor-pointer">Hinjawadi</span>
       <span className="ml-4">Hinjawadi Phase III</span>
      </div>
      <ul className="flex w-5/12 justify-between"> 
        <li className="cursor-pointer hover:text-orange-600">Home</li>
        <li className="cursor-pointer hover:text-orange-600">About Us</li>
        <li className="cursor-pointer hover:text-orange-600">Cart</li>
      </ul>
    </div>
    );
}
export default NavBar;