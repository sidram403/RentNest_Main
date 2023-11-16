import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'

const Listing = () => {
    SwiperCore.use([Navigation])
    const { currentUser } = useSelector((state) => state.user);
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const params = useParams();


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
  return (
    <main>
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p> }
        {error && <p className='text-center my-7 text-2xl'>Something went wrong!</p> }
        {listing && !loading && !error &&(
            <>
            <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
            </>
        )}
    </main>
  )
}

export default Listing