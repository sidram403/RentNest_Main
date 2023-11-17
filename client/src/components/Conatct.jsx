import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';

const Conatct = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const onChange = (e) => {
    setMessage(e.target.value);
  };
 
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);

        const data = await res.json();

        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <div>
      {landlord && (
        <div className='flex flex-col gap-2'>
          
          <p>Conatct Number : <span>{landlord.phone}</span></p>
          

          <Link
          onClick={() => {
            navigator.clipboard.writeText(landlord.phone);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 2000);
          }}
          className='bg-green-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Call owner          
          </Link>
          {copied && (
            <Alert variant="filled" severity="success" className="fixed bottom-[10%] right-[5%] z-10 rounded-md bg-slate-100 p-2 ">
            Owner Number Copied!
            </Alert>
            
          )}
        </div>
      )}
    </div>
  );
};

export default Conatct;
