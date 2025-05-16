import React,{useState} from 'react'
import { createImageUrl } from '../services/movieServices'
import MovieModal from "./MovieModal";
import { UserAuth } from '../context/AuthContent';
import { useNavigate } from 'react-router-dom';


const MovieItem = ({movie}) => {
    const {title,backdrop_path,poster_path} = movie
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
  return (
    <>
    <div className='relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] 
    inline-block rounded-lg overflow-hidden cursor-pointer m-2'
    onClick={handleOpenModal}>
    <img className="w-full h-40 block object-cover object-top" src={createImageUrl(backdrop_path ?? poster_path,"w500")} alt={title} />
    <div className='absolute top-0 left-0 w-full h-40 bg-black/80
    opacity-0 hover:opacity-100'>
    <p className='whitespace-normal text-xs md:text-sm flex
    justify-center items-center h-full font-nsans-bold'>{movie.title}</p>
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
  )
}

export default MovieItem