import React from "react";

const ListingItem = ({ listing }) => {
  return (
    <div className="bg-white text-black shadow-md hover:shadow-lg transition-shadow overflow-scroll rounded-lg w-full sm:w-[600px]">
      
      <code>{JSON.stringify(listing)}</code>
    </div>
  );
};

export default ListingItem;
