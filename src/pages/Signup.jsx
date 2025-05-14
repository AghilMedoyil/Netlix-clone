import React, { useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContent';

const Signup = () => {

  const [remLogin,setRemLogin] = useState(true)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState("");

  const { user,signUp } = UserAuth()
  const navigate = useNavigate()

 

  const handleFormSubmit = async(e)=> {
    e.preventDefault()
    setErrorMessage("");
    
      const result = await signUp(email,password)
      if(result.success){
        navigate('/login')
      }
      else{
        setErrorMessage(result.error || "Signup failed");
      }
  }
  return (
    <>
    <div className='w-full h-screen'>
      <img className='hidden sm:block absolute w-full h-full object-cover'
       src="https://assets.nflxext.com/ffe/siteui/vlv3/cb17c41d-6a67-4472-8b91-cca977e65276/web/IN-en-20250505-TRIFECTA-perspective_03ae1a85-5dcf-4d20-a8a6-1e61f7ef73cb_large.jpg" srcset="https://assets.nflxext.com/ffe/siteui/vlv3/cb17c41d-6a67-4472-8b91-cca977e65276/web/IN-en-20250505-TRIFECTA-perspective_03ae1a85-5dcf-4d20-a8a6-1e61f7ef73cb_large.jpg 2000w, https://assets.nflxext.com/ffe/siteui/vlv3/cb17c41d-6a67-4472-8b91-cca977e65276/web/IN-en-20250505-TRIFECTA-perspective_03ae1a85-5dcf-4d20-a8a6-1e61f7ef73cb_medium.jpg 1279w, https://assets.nflxext.com/ffe/siteui/vlv3/cb17c41d-6a67-4472-8b91-cca977e65276/web/IN-en-20250505-TRIFECTA-perspective_03ae1a85-5dcf-4d20-a8a6-1e61f7ef73cb_small.jpg 959w" alt="" />
      <div className='bg-black/70 fixed top-0 left-0 w-full h-screen' />
      <div className='fixed w-full px-4 py-24 z-20'>
        <div className='max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-lg'>

          <div className='max-w-[320px] mx-auto py-16'>
            <h1 className='text-3xl font-nsans-bold'>Sign Up</h1>
            <form onSubmit={handleFormSubmit} className='w-full flex flex-col py-4'>
              <input type="email" className='p-3 my-2 bg-gray-700 rounded'
              placeholder='email' autoComplete='email'
              value={email} onChange={(e) => setEmail(e.target.value)}
              />

              <input type="password" className='p-3 my-2 bg-gray-700 rounded'
              placeholder='password' 
              autoComplete='password'
              value={password} onChange={(e)=> setPassword(e.target.value)}
              />

              <button className='bg-red-600 py-3 my-6 rounded font-nsans-bold'>
                Sign Up
              </button>
            <div className='flex justify-between items-center text-gray-600'>
              <p>
                <input type="checkbox" className='mr-2' />Remmeber me
              </p>
              <p>Need Help?</p>
              </div>
              <p className='my-4'>
                <span className='text-gray-600 mr-2'>Already subscribed to Netflix? </span>
                <Link to="/login">Sign In</Link>
              </p>
{errorMessage && (
  <p className="text-sm text-red-600 mt-2">
    {errorMessage}
  </p>
)}




            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Signup