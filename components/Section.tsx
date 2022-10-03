import React, { useEffect,useRef} from 'react'
import { Movie } from '../data/types';
import {ChevronRightIcon,ChevronLeftIcon} from '@heroicons/react/outline'
import Card from '../components/Card';
import Image from 'next/image'
import { cardImagesUrl, movieGenres } from '../data/data';
import { networkInterfaces } from 'os';

 interface IGenre   {
     flixes: [Movie],
     title:string
}

function Section({ flixes, title }: IGenre) {
    const slideRef = useRef<HTMLDivElement>(null);
    let w:any;
    const handleArrows = (dir: string) => {
        let movieSections: any;
        if (typeof document !== "undefined") {
            movieSections = document.getElementById('slide-image')! as HTMLImageElement || null;
            w = movieSections.clientWidth + 10;
        };
        if (slideRef.current) {
            const { scrollLeft } = slideRef.current;
            const scrollTo = dir === "L" ? scrollLeft -  w: scrollLeft +  w;
            slideRef.current.scrollTo({left: scrollTo, behavior:"smooth"});
        };
    };
    return (
        <div  className= ' space-y-1 md:space-y-2 h-50'>
            <h2 className=' cursor-pointer text-sm flex md:text-2xl 
            mt-7
           ml-2 md:mt-10
            lg:text-3xl'>{ title}</h2>
            <div className='group relative md:-ml-2'>
              
                <ChevronLeftIcon onClick={()=>handleArrows("L")} className=' section-arrow left-6'/>
                    <div ref={slideRef} id='movieSlide'  className='flex scroll scroll-smooth  transition-all duration-300  whitespace-nowrap items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2'>
                        {flixes.map((flix) => 
                        (<div   key={flix.id} className='relative space-y-5 h-28 min-w-[180px] cursor-pointer transition-all duration-300 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105'>
                            <Image
                                id='slide-image'
                                className="object-cover"
                                layout='fill'
                                src={`${cardImagesUrl + flix.backdrop_path || flix.poster_path}`}
                            />
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
