import RestaurantCardShimmer from "./RestaurantCardShimmer";

const FirstLoadShimmer = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="h-36 bg-slate-700 text-gray-300 text-lg font-bold flex justify-center items-center">
        <span className="text-center">
          Looking For Great Food Near You.....
        </span>
      </div>
      <div className="flex justify-center">
        <div className="mt-8 w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grids-cols-5  gap-2 gap-y-2">
        <RestaurantCardShimmer></RestaurantCardShimmer>
        <RestaurantCardShimmer></RestaurantCardShimmer>
        <RestaurantCardShimmer></RestaurantCardShimmer>
        <RestaurantCardShimmer></RestaurantCardShimmer>
        <RestaurantCardShimmer></RestaurantCardShimmer>
        <RestaurantCardShimmer></RestaurantCardShimmer>
        <RestaurantCardShimmer></RestaurantCardShimmer>
        <RestaurantCardShimmer></RestaurantCardShimmer>
        <RestaurantCardShimmer></RestaurantCardShimmer>
        <RestaurantCardShimmer></RestaurantCardShimmer>
        <RestaurantCardShimmer></RestaurantCardShimmer>
        </div>
      </div>
    </div>
  );
};
export default FirstLoadShimmer;
