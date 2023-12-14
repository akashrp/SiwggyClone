import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { MAIN_PAGE_DATA_API, UPDATE_LIST } from "../Uitils/APILinks";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard"; // Import your RestaurantCard component
import BestOffers from "./BestOffers";
import WhatsOnYourMind from "./WhatsOnYourMind";
import TopRestaurant from "./TopRestaurant";
import { UseSelector, useSelector } from "react-redux";
import store from "../store";
import FirstLoadShimmer from "./FirstLoadShimmer";
import RestaurantCardShimmer from "./RestaurantCardShimmer";

const Body = () => {
  const [restaurantData, setRestaurantData] = useState([]);
  const [restaurantCount, setRestaurantCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [bestOffers, setBestOffers] = useState([]);
  const [dishes,setDishes]=useState([]);
  const [topRestaurants,setTopRestaurants]=useState([]);
  const [topRestaurantTitle,setTopRestaurantTitle]=useState("");
  const [restaurantTitle,setRestaurantTitle]=useState("");
  const [isRestaurantDataLoading,setIsRestaurantDataLoading]=useState(false);
  const [isSwiggyNotPresent,setIsSwiggyNotPresent]=useState(false);
  const geometry= useSelector((store)=>store.location.geometry);
  useEffect(() => {
    setRestaurantCount((prevCount)=>0);
    setRestaurantData([]);
    setTopRestaurants([]);
    setBestOffers([]);
    setDishes([]);
    setTopRestaurantTitle("")
    setRestaurantTitle("")
    getRestaurantData();
  }, [geometry]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener('touchmove', handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [restaurantCount]);
  useEffect(() => {
    if (isRestaurantDataLoading) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isRestaurantDataLoading]);
  const handleScroll = () => {
    
  
    const windowHeight = window.innerHeight; // Height of the viewport
      const scrollY = window.scrollY; // Vertical scroll position
      const documentHeight = document.documentElement.scrollHeight; // Total height of the document
    if (
      !isLoading &&!isRestaurantDataLoading&& !isSwiggyNotPresent&&
      document.documentElement.scrollTop +
        document.documentElement.clientHeight+1 >=
        document.documentElement.scrollHeight
    ) {
      updateRes();
    }
    else if( !isSwiggyNotPresent && !isLoading &&windowHeight + scrollY >= documentHeight)
    {
      updateRes();
    }
  };

  const updateRes = async () => {
    try {
      setIsLoading(true);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      const payload = {
        filters: {},
        lat: geometry.lat|| 18.5642452,
        lng: geometry.lng|| 73.7768511,
        nextOffset: "COVCELQ4KIDAwpmj04PDCDCnEzgE",
        page_type: "DESKTOP_WEB_LISTING",
        seoParams: {
          apiName: "FoodHomePage",
          pageType: "FOOD_HOMEPAGE",
          seoUrl: "https://www.swiggy.com/",
        },
        widgetOffset: {
          NewListingView_Topical_Fullbleed: "",
          NewListingView_category_bar_chicletranking_TwoRows: "",
          NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
          Restaurant_Group_WebView_PB_Theme: "",
          Restaurant_Group_WebView_SEO_PB_Theme: "",
          collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: (
            restaurantCount + 1
          ).toString(),
          inlineFacetFilter: "",
          restaurantCountWidget: "",
        },
        _csrf: "Dn01m10Z9u9n-4TY--T0i5o_Z3Zd16pD_SRJq4TM",
      };

      const headers = {
        "Content-Type": "application/json; charset=utf-8",
      };

      const result = await axios.post(UPDATE_LIST, payload, {
        headers: headers,
      });

      const tempRestaurantData = result?.data?.data?.cards?.find(
        (x) => x.card.card.id === "restaurant_grid_listing"
      )?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      let uniqueRestaurants = [];
      if (tempRestaurantData && tempRestaurantData.length > 0) {
        tempRestaurantData.forEach((element) => {
          let id = element.info.id;
          let isRestaurantExist = restaurantData.find((x) => x.info.id == id);
          if (!isRestaurantExist) {
            uniqueRestaurants.push(element);
          }
        });
      }
   
      uniqueRestaurants &&
        uniqueRestaurants.length > 0 &&
        setRestaurantData((prevRecords) => [
          ...prevRecords,
          ...uniqueRestaurants,
        ]);
      setRestaurantCount((prevCount) => prevCount + uniqueRestaurants.length);
      window.addEventListener("scroll", handleScroll);
      window.addEventListener('touchmove', handleScroll);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const getRestaurantData = async () => {
    try {
      let lat= geometry.lat||'18.5912716'
      let lng= geometry.lng||'73.73890899999999'
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      setIsRestaurantDataLoading(true);
      const result = await axios.get(MAIN_PAGE_DATA_API+'lat='+lat+'&lng='+lng+"&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
      let isSwiggyNotPresent =result?.data?.data.cards?.find(x=>x.card.card.id==="swiggy_not_present");
      if(!isSwiggyNotPresent)
      {
        setIsSwiggyNotPresent(false);  
        const tempRestaurantData = result?.data?.data?.cards?.find(
          (x) => x.card.card.id === "restaurant_grid_listing"
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        tempRestaurantData &&  setRestaurantCount((prevCount) => {
          return tempRestaurantData.length;
        });
          
        setRestaurantData(tempRestaurantData);
        const tempBestOffers = result.data.data.cards.find(
          (x) => x.card.card.id == "topical_banner"
        )?.card?.card?.imageGridCards?.info;
        setBestOffers(tempBestOffers);
  
        const tempDishes = result?.data?.data?.cards?.find(
          (x) => x.card.card.id === "whats_on_your_mind"
        )?.card?.card?.gridElements?.infoWithStyle?.info;
        
        setDishes(tempDishes)
        const tempTopRestaurantData = result?.data?.data?.cards?.find(
          (x) => x.card.card.id === "top_brands_for_you"
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        setTopRestaurants(tempTopRestaurantData);
  
        let tempTitle=result?.data?.data?.cards?.find(
          (x) => x.card.card.id === "top_brands_for_you"
        )?.card?.card?.header?.title;
        setTopRestaurantTitle(tempTitle);
  
        let tempResTitle=result?.data?.data?.cards?.find(
          (x) => x.card.card.id === "popular_restaurants_title"
        )?.card?.card?.title;
        setRestaurantTitle(tempResTitle)
      }
      else
      {
          setIsSwiggyNotPresent(true);
      }
    
      setIsRestaurantDataLoading(false)
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("touchmove", handleScroll);
    } catch (error) {
    }
  };

  return (
    <>
    {
      isRestaurantDataLoading?<FirstLoadShimmer></FirstLoadShimmer>:
      isSwiggyNotPresent?
      <div className="flex w-full mt-28 justify-center h">
          <div className="flex justify-center flex-col items-center w-2/3">
                <img className=" w-1/4" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"></img>
                <span className="font-bold text-xl mt-3">Location Unserviceable</span>
                <span className="text-sm">We don’t have any services here till now. Try changing location.</span>
            </div>
      </div>:
    <div className="flex flex-col items-center">
      {bestOffers && bestOffers.length>0 &&
      <div className="mt-8 w-3/4">
        <BestOffers offers={bestOffers}></BestOffers>
      </div>
      }
      {
        dishes && dishes.length>0 &&
        <div className="mt-8 w-3/4">
        <WhatsOnYourMind dishes={dishes}></WhatsOnYourMind>
        </div>
      }
      {
        topRestaurants && topRestaurants.length>0 &&
        <div className="mt-8 w-3/4">
          <TopRestaurant Restaurants={topRestaurants} title={topRestaurantTitle}></TopRestaurant>
        </div>
      }
       <div className="flex text-start w-3/4 mt-8 mb-8">
       <span className=" text-gray-700 font-bold text-xl">
               {restaurantTitle}
       </span>
       </div>
      
      <div className="mt-8 w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grids-cols-5  gap-2 gap-y-2">
        {restaurantData.map((restaurant) => (
          <Link key={restaurant.info.id} to={`/menu/${restaurant.info.id}`}>
            <RestaurantCard ResInfo={restaurant} />
          </Link>
        ))}
        {
          isLoading&&
          <>
            <div className="md:hidden mb-3">Fetching Restaurants....</div>
          <>
            <RestaurantCardShimmer/>
            <RestaurantCardShimmer/>
            <RestaurantCardShimmer/>
            <RestaurantCardShimmer/>
            <RestaurantCardShimmer/>
            <RestaurantCardShimmer/>
            <RestaurantCardShimmer/>
            <RestaurantCardShimmer/>
            <RestaurantCardShimmer/>
          </>
          </>
        }
      </div>
    </div>
    }
    </>
    
  );
};

export default Body;
