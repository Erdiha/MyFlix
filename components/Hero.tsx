import React,{useState,useEffect} from 'react'
import { Movie } from '../data/types';
import { HeroMovieImageUrl, movieState, movieID, handleLongSentences } from '../data/data';
import Image from 'next/image'
import { FaPlayCircle } from "react-icons/fa";
import { useRecoilState } from 'recoil';
interface IOriginals{
    netflixOriginals:Movie[]
}
function Hero({ netflixOriginals }: IOriginals) {
  const [heroMovie, setHeroMovie]: any = useState<Movie | null>(null);
  const [displayModal, setDisplayModal] = useRecoilState(movieState);
  const [getMovie,setMovie] = useRecoilState(movieID);

  useEffect(() => {
    const min = 0;
    const max = netflixOriginals?.length - 1;
    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    setHeroMovie(netflixOriginals[rand]);
   
  }, [netflixOriginals]);  
  return (
    <div className='flex justify-center 
           lg:h-[65vh]
            lg:justify-end lg:pb-10 mt-[92px]
             items-center relative ' >
          <div className='hero-wrapper'>
        <Image layout='fill' className=' imgContainer object-cover'
          src={`${HeroMovieImageUrl ? HeroMovieImageUrl + heroMovie?.poster_path : "http://via.placeholder.com/1080x1580"}`}
           / >
          </div>
          <div className='desc-wrapper '>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold" >{heroMovie?.title }</h1>
              <p className='max-w-xs text-sm lg:text-2xl
              md:max-w-lg md:text-md lg:max-w-2xl 
               '>{handleLongSentences(heroMovie?.overview,250)}
          </p>
              
              <div className='flex gap-10'>
                  <button className=' hover:bg-green-300 hover:scale-[1.1] hero-btn  text-[2rem] 
                   bg-[#ADDDD0]'><FaPlayCircle className='m-2' />  {`${ " "} Play`}</button>
               <button
                onClick={()=>{  
                  setDisplayModal(() => true);
                  setMovie(heroMovie); }}

                  className='hero-btn text-[1rem]  
                  
                  text-[#f6f6f6] hover:text-[1.1rem]'>More Info...</button>
              </div>
          </div>
    </div>
  )
}

export default Hero
