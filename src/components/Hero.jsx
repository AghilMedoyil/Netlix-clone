import React, { useEffect, useState } from 'react'
import axios from "axios";
import endpoints, { createImageUrl } from "../services/movieServices";
import { useNavigate } from 'react-router-dom';
import MovieModal from './MovieModal';
import { UserAuth } from '../context/AuthContent';


const Hero = () => {
    const [movie,setMovie] = useState({});
    useEffect(()=>{
        axios.get(endpoints.popular).then((response) => {
            const movies = response.data.results;
            const randomMovie = movies[Math.floor(Math.random() *movies.length)]
            setMovie(randomMovie);
        })
    },[]);

    const [showModal, setShowModal] = useState(false);
    const [showLoggin, setShowLoggin] = useState(false);
    const {user} = UserAuth()
    const navigate = useNavigate()
    const handleOpenModal = () => {
    if (user) {
      setShowModal(true);
    } else {
      setShowLoggin(true);
    }
  };

    const truncate =(str,length) => {
        if(!str) return "";
        return str.length > length ? str.slice(0,length) + '...' : str
    }
    const {title,backdrop_path,release_date,overview} = movie;
      return (
        <>
    <div className='w-full h-[550px] lg:h-[850px]'>
        <div className='w-full h-full'>
        <div className=' absolute w-full h-[550px] lg:h-[850px] bg-gradient-to-r from-black'>
        <img className='w-full h-full object-cover object-top' 
        src={createImageUrl(backdrop_path,"original")} alt='{title}' />
        <div className='absolute w-full top-[10%] lg:top-[25%] p-4 md:p-8'>
            <h1 className='text-3xl md:text-6xl font-nsans-bold'> 
                {title}
               </h1>
               <div className='mt-8 mb-4'>
            <button onClick={handleOpenModal}className='captilize border bg-gray-300 text-black py-2 px-5 '>play</button>
            <button className='captilize border border-gray-300 py-2 px-5 ml-4'>watch later</button>
            </div>
        
        <p className='text-gray-400 text-sm'>{release_date}</p>
        <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>{truncate(overview,165)}</p>
        </div>
       </div>
       </div>
    </div>
    {showModal && (
  <MovieModal movie={movie} onClose={() => setShowModal(false)} />
)}

{showLoggin && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm text-center">
            <p className="text-lg font-semibold text-gray-800 mb-4">
              Please login to view movie details
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Go to Login
            </button>
            <button
              onClick={() => setShowLoggin(false)}
              className="block mt-3 text-sm text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
)}
    </>
  );
};

export default Hero