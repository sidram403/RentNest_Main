import React, { useEffect, useState } from "react";
import ListingItem from "../components/ListingItem";

const Search = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    filterTerm: "",

    
  });
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [listings, setListings] = useState([]);
  console.log(listings)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const filterTermFromUrl = urlParams.get("filterTerm");

    if (
      searchTermFromUrl || filterTermFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        filterTerm: filterTermFromUrl || "",
      });
    }
    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false)
      const searchQuery = urlParams.toString();
      const res = await fetch(`api/listing/get?${searchQuery}`);
      const data = await res.json();
      console.log(data);
      if(data.length > 8) {
        setShowMore(true);
      }else{
        setShowMore(false)
      }  
      setListings(data);
      setLoading(false);
    };
    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebarData({ ...sidebarData, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }

    if (e.target.id === "filterTerm") {
      setSidebarData({ ...sidebarData, filterTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebarData({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("filterTerm", sidebarData.filterTerm);
    const searchQuery = urlParams.toString();
    // navigate(`/search?${searchQuery}`);
    const url = `http://localhost:3000/api/listing/get?${searchQuery}`

    window.open(url, '_blank');
    
  };

  const onShowMoreClick = async () =>{
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString()
    const res  = await fetch(`/api/listing/get?${searchQuery}`)
    const data = await res.json();
    if(data.length < 9){
        setShowMore(false)
    }
    setListings([...listings, ...data])
  }

  return (
    <div className="flex flex-col md:flex-row md:min-h-screen">
      <div className="p-7 border-b-2 md:border-r-2 ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="rounded-lg border p-3 w-full"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Filter Term:
            </label>
            <input
              type="text"
              id="filterTerm"
              placeholder="Search..."
              className="rounded-lg border p-3 w-full"
              value={sidebarData.filterTerm}
              onChange={handleChange}
            />
          </div>
         
         
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Log Results: {listings.length}
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700 ">No listing found</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              <span className="loading loading-dots loading-lg"></span>
            </p>
          )}
          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

            {showMore && (
              <button onClick={onShowMoreClick} className="text-green-700 hover:underline p-7 text-center w-full">
                Show More
              </button>  
            )}
        </div>
      </div>
    </div>
  );
};

export default Search;
