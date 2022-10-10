import React, { useRef,useState} from 'react'
import {ChevronRightIcon,ChevronLeftIcon} from '@heroicons/react/outline'
import Image from 'next/image'
import useAuth , { cardImagesUrl,userLibrary,movieState,movieID,handleLongSentences,handleRating } from '../data/data';
import { useRecoilValue,useRecoilState } from 'recoil';
import { DocumentData } from 'firebase/firestore';
import { Movie } from '../data/types';

  interface IGenre   {
     flixes: Movie[] | DocumentData[],
     title:string
}
function Section({ flixes, title }: IGenre) {
    const slideRef = useRef<HTMLDivElement>(null);
    const [displayModal, setDisplayModal] = useRecoilState(movieState);
    const [getMovie, setMovie] = useRecoilState(movieID);
    

    let w:any;
    const handleArrows = (dir: string) => {
        
        
        if (typeof document !== "undefined") {
          const  movieSections = document.getElementById('movieSlide')! as HTMLImageElement || null;
            w = movieSections.clientWidth - 20;
        };
        if (slideRef.current) {
            const { scrollLeft } = slideRef.current;
            const scrollTo = dir === "L" ? scrollLeft -  w: scrollLeft +  w;
            slideRef.current.scrollTo({left: scrollTo, behavior:"smooth"});
        };
    };
    console.log("this is the all data", flixes);
   
    return (
        <div className=' space-y-1 md:space-y-2 h-50'>
            <h2 className=' cursor-pointer text-[1rem] flex md:text-2xl 
            mt-7 text-white
           ml-2 md:mt-10
            lg:text-3xl'>{ title}</h2>
            <div className='group relative md:-ml-2'>
              
                <ChevronLeftIcon onClick={()=>handleArrows("L")} className=' section-arrow left-6'/>
                <div ref={slideRef} id='movieSlide' className='flex scroll scroll-smooth ml-2  transition-all 
                    duration-300 ease-in-out  whitespace-nowrap items-center space-x-0.5 py-3 gap-3
                    overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-4'>
                        {flixes.map((flix) => 
                        (<div onClick={() => {
                            setMovie(flix);
                            setDisplayModal(true);
                        }} key={flix.id} className='relative h-[12rem]  min-w-[130px] cursor-pointer transition-all 
                        duration-300 ease-out md:h-[20rem] md:min-w-[200px] md:hover:scale-105'>
                           
                            <Image  
                                id='slide-image'
                                className="object-cover cover "
                                layout='fill'
                                src={`https://image.tmdb.org/t/p/w500${ flix.backdrop_path || flix.poster_path
        }`}
                            />
                          
                            <p className={`absolute h-8 w-8 md:w-10 md:h-10  text-black text-sm
                            bottom-[-10px] right-[2rem] rounded-full border-2
                            ${handleRating(flix)! > 50 ? (handleRating(flix)! > 80 ? "text-green-500 border-green-500"
                                    : "text-orange-300 border-orange-300") : "text-red-600 border-red-600"}
                             bg-slate-900 items-center flex justify-center md:font-bold`}>{handleRating(flix)+"%"}</p>
                        </div>)
                        )}
                </div>
                <ChevronRightIcon onClick={() => handleArrows("R")} className="section-arrow  
                right-6"/>
            
            </div>
      
        </div>
    );
};

export default Section
