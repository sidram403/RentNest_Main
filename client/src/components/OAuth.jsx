import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSucess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
import GoogleIcon from '@mui/icons-material/Google';

const OAuth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleGoogleClick = async () =>{
        try {
            const provider = new GoogleAuthProvider()
            const auth =  getAuth(app)

            const result = await signInWithPopup(auth, provider)

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: result.user.displayName,
                  email: result.user.email,
                  photo: result.user.photoURL,
                }),
              });
            const data = await res.json();
            dispatch(signInSucess(data))
            navigate('/')
        } catch (error) {
            console.log("could not sign in with google", error)
        }
    }

  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-700 flex justify-center items-center gap-2 text-white p-3   rounded-lg uppercase hover:opacity-95'>
      <GoogleIcon className='font-md items-center '  /> Continue with google
      </button>
  )
}

export default OAuth