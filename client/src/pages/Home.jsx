import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";


const Home = () => {
  SwiperCore.use([Navigation]);

  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* Top */}
      <div className="relative hidden sm:flex isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <div
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
        />
      </div>
      <div
        className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
        />
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 " >
        <p className="text-sm leading-6 text-gray-900">
          <strong className="font-semibold">Exclusively for You</strong>
          <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
            <circle cx={1} cy={1} r={1} />
          </svg>
          Experience Effortless House-Hunting with Our Handpicked Selection of Homes
        </p>
        <Link to='/search'  className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900" >
            Explore now <span aria-hidden="true">&rarr;</span>
        </Link>

      </div>
      <div className="flex flex-1 justify-end">
        <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
          <span className="sr-only">Dismiss</span>
        </button>
      </div>
    </div>
      <div className="justify-center gap-6 text-center items-center p-10 px-3 max-w-6xl mx-auto flex flex-col md:flex-row  ">
        <div className="flex-1 flex justify-center items-start flex-col xl:px-0 sm:px-16 px-6">
            <div className="flex flex-row justify-between items-center w-full">
              <h1 className="flex-1 font-poppins font-semibold sm:text-[55px] text-[45px] text-white sm:leading-[70px] leading-[75-px]">
                Discover Most Suitable
                <span className="text-gradient"> Rental Property </span>{" "}
              </h1>
            </div>
            <h1 className="font-poppins font-semibold sm:text-[55px] text-[45px] text-white sm:leading-[70px] leading-[75-px] w-full">
            in Bengaluru.
          </h1>
          <p className="font-poppins font-normal text-slate-400 text-[18px] leading-[30.8px] w-full  mt-5">
            Unlock the Door to Your Perfect Home in Bangalore with RentNest!
          </p>
          <div className="w-full mt-10">
              <Link to='/search'>
                <button
                  type="button"
                  className="text-white  bg-gray-800 hover:bg-gray-900 focus:outline-none  focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-2xl px-5 py-2  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                  <p>
                    <span>
                      Explore Now{" "}
                      <DoubleArrowIcon className="text-5xl items-center" />
                    </span>
                  </p>
                </button>
              </Link>
              
          </div>
        </div>
      </div>
     

      {/* Swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Listing results */}
      <div className="bg-slate-200 max-w-8xl mx-auto p-3 px-10 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent Offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>  
              <div className="flex flex-wrap gap-4">
                {offerListings.map((listing) => (
                  <ListingItem key={listing._id} listing={listing} />
                ))}
              </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>  
              <div className="flex flex-wrap gap-4">
                {rentListings.map((listing) => (
                  <ListingItem key={listing._id} listing={listing} />
                ))}
              </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>  
              <div className="flex flex-wrap gap-4">
                {saleListings.map((listing) => (
                  <ListingItem key={listing._id} listing={listing} />
                ))}
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
