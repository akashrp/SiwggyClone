import { useSelector } from "react-redux";
import store from "../store";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import LocationToggel from "./LocationToggel";

const NavBar = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const [showLocationToggle,setShowLocationToggle]=useState(false)
  const location =useSelector((store)=>store.location.location);
  const handleLocationClick=()=>
  {
    setShowLocationToggle(true)
  }
  useEffect(() => {
    if (showLocationToggle) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [showLocationToggle]);
  return (
    <div className="flex w-full justify-between py-5 px-7 sm:px-20 items-center shadow-lg ">
      <div className="flex w-7/12 items-center">
        <Link to={"/"}>
          <img
            className="h-12 cursor-pointer"
            src="https://seeklogo.com/images/S/swiggy-logo-8EF8260FA4-seeklogo.com.png"
          />
        </Link>
        <span onClick={handleLocationClick} className="underline underline-offset-4 ml-10 hover:text-orange-600 cursor-pointer">
          {location.main_text||'Hinjawadi'}
        </span>
        <span className="ml-4 hidden md:flex">{location.secondary_text||'Pune, Maharashtra, India'}</span>
      </div>
      <ul className="flex w-5/12 justify-between">
        <Link to={"/"} className="hidden md:flex">
          <li className="cursor-pointer hover:text-orange-600">Home</li>
        </Link>
        <Link to={"/AboutUs"}>
          <li className="cursor-pointer hover:text-orange-600">About Us</li>
        </Link>
        <Link to={"/checkout"}>
          <li className="cursor-pointer hover:text-orange-600">
            
            {"Cart " + (cartItems ? cartItems.length : "")}
          </li>
        </Link>
      </ul>
      {
        showLocationToggle&&
        <div className="fixed  inset-0 bg-black bg-opacity-50">
          <LocationToggel setShowToggle={setShowLocationToggle}></LocationToggel>
        </div>
      }
    </div>
  );
};
export default NavBar;
