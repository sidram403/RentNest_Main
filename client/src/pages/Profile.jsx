import React, { useEffect, useRef, useState } from 'react'
import {getStorage, uploadBytesResumable, ref, getDownloadURL} from 'firebase/storage'
import { useSelector } from 'react-redux'
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';


const Profile = () => {

  const fileRef = useRef(null)


  const {currentUser, loading, error} = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const dispatch = useDispatch();
  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() =>{
    if(file){
      handleFileUpload(file);
    }
  }, [file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{'Content-Type': 'application/json',},
        body: JSON.stringify(formData),
      })
      const data = await res.json();

      if(data.success === false){
        dispatch(updateUserFailure(data.message))
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }

  }

  const handleDeleteUser = async () =>{
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef}  hidden accept='image/*'/>
        <img onClick={() => fileRef.current.click()} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' src={formData.avatar || currentUser.avatar} alt="" />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input onChange={handleChange} type="text" placeholder='Username' className='border p-3 rounded-lg' id='username' defaultValue={currentUser.username} />
        <input onChange={handleChange} type="email" placeholder='Email' className='border p-3 rounded-lg' id='email' defaultValue={currentUser.email} />
        <input onChange={handleChange} type="number" placeholder='Phone Number' className='border p-3 rounded-lg' id='phone'defaultValue={currentUser.phone} />
        <input onChange={handleChange} type="password" placeholder='Password' className='border p-3 rounded-lg' id='password'/>
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg uppercase p-3 hover:opacity-95 disabled::opacity-80'>
          {loading ? 'Loading...' : "Update"}
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error :''}</p>
      <p className='text-green-700 mt-5'>{updateSuccess ? "User is updated successfully":""}</p>
    </div>
  )
}

export default Profile