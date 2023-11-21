import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";
import Conatct from "../components/Conatct";
import Alert from "@mui/material/Alert";

const Listing = () => {
  SwiperCore.use([Navigation]);
  const { currentUser } = useSelector((state) => state.user);
  const [contact, setContact] = useState(false);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const listingId = params.id;
        const res = await fetch(`/api/listing/list/${listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.id]);

  const handleGetOwnerDetails = () => {
    if (currentUser && listing.userRef !== currentUser._id) {
      setContact(true);
    } else {
      navigate("/sign-in");
    }
  };
  return (
    <main className="bg-white">
      {loading && (
        <p className="text-center my-7 text-2xl">
          <span className="loading loading-dots loading-lg"></span>
        </p>
      )}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <Alert
              severity="success"
              variant="filled"
              className="fixed bottom-[10%] right-[5%] z-10 rounded-md bg-slate-100 p-2 "
            >
              Link copied!
            </Alert>
          )}

          
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <p className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                {listing.name}
              </p>
              <p className="flex items-center my-6 gap-2 text-slate-600  text-sm">
                <FaMapMarkerAlt className="text-green-700" />
                {listing.address}
              </p>
              <div className="flex gap-4">
                <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  {listing.type === "rent" ? "For Rent" : "For Sale"}
                </p>
                {listing.offer && (
                  <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                    ₹{+listing.regularPrice - +listing.discountPrice} Discount
                  </p>
                )}
              </div>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                Price Details
              </p>

              {/* Reviews */}
              <div className="stats-verical bg-primary  text-primary-content md:text-primary-content mt-6 mx-auto md:stats md:bg-primary">
                <div className="stat place-items-center">
                  <div className="stat-title text-black">Monthly Rent</div>
                  <div className="stat-value text-3xl md:text-4xl">
                    ₹{" "}
                    {listing.offer
                      ? listing.discountPrice.toLocaleString("en-IN")
                      : listing.regularPrice.toLocaleString("en-IN")}
                  </div>
                </div>

                {listing.depositPrice && (
                  <div className="stat place-items-center">
                    <div className="stat-title text-black">Deposite Amount</div>
                    <div className="stat-value text-3xl md:text-4xl">
                      ₹ {listing.depositPrice.toLocaleString("en-IN")}
                    </div>
                  </div>
                )}
              </div>
              {!contact && (
                <button
                  onClick={handleGetOwnerDetails}
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Get owner Deatails
                </button>
              )}
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl my-3">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {listing.description}
                  </p>
                </div>
                <ul className="text-green-900 text-semibold text-sm  my-5 flex flex-wrap items-center gap-4 sm:gap-6">
                  <li className="flex items-center gap-1 whitespace-nowrap ">
                    <FaBed className="text-lg" />
                    {listing.bedrooms > 1
                      ? `${listing.bedrooms} Beds`
                      : `${listing.bedrooms} Bed`}
                  </li>
                  <li className="flex items-center gap-1 whitespace-nowrap ">
                    <FaBath className="text-lg" />
                    {listing.bathrooms > 1
                      ? `${listing.bathrooms} Baths`
                      : `${listing.bathrooms} Bath`}
                  </li>
                  <li className="flex items-center gap-1 whitespace-nowrap ">
                    <FaParking className="text-lg" />
                    {listing.parking ? "Parking Spot" : "No Parking"}
                  </li>
                  <li className="flex items-center gap-1 whitespace-nowrap ">
                    <FaChair className="text-lg" />
                    {listing.furnished ? "Furnished" : "No Furnished"}
                  </li>
                </ul>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                {/* <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600"></span>
                    </li>
                  ))}
                </ul>
              </div> */}
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{listing.details}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Listing;
