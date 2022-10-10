import React, { useEffect, useState } from 'react';
import { MAIN_URL, api,MorT, cardImagesUrl, movieState, movieID } from '../data/data';
import Header from '../components/Header';
import Image from 'next/image'
import { useRecoilState } from 'recoil';
import ModalCard from '../components/ModalCard';
 import {IconButton } from"@mui/material";
import TextField from "@mui/material/TextField";
import { SearchOutlined } from '@mui/icons-material';
import { handleRating } from '../data/helperFunctions';

function MoviesOrTv() {

    const [resData, setResData]: any = useState([]);
    const [displayModal, setDisplayModal] = useRecoilState(movieState);
    const [getMovie, setMovie] = useRecoilState(movieID);
    const [movieOrTv, setmovieOrTv] = useRecoilState(MorT);
    const [select, setSelect] = useState({
        tv: false,
        movie: false
    });
    const [searchTerm, setSearchTerm] = useState("");
    let flixName: string;
    useEffect(() => {

            async function getAll() {  
              const  allData=   await fetch(`${MAIN_URL}/discover/${movieOrTv}?api_key=${api}&certification_country=US&certification.lte=G&sort_by=popularity.desc&page=1`
            ).then((response) => response.json()).catch((error) => { alert(error.message) });
              setResData(allData.results);
        };
        getAll();
        movieOrTv==="movie"?setSelect((prev:any)=>{return {...prev,movie:true}}):setSelect((prev:any)=>{return {...prev,tv:true}})

    }, [movieOrTv]);
   

  return (
      <div className='flex flex-col  relative   bg-gradient-to-t from-[rgb(173,221,208)] to-black'>
          <Header />
          <div className='flex  mt-[10rem] flex-col justify-center items-center '>
               <TextField
               
                  className='text-black bg-slate-200 h-full p-2 w-full font-semibold text-[20px] rounded md:w-[500px]
                  md:text-2xl'
                id="standard-bare"
                variant="outlined"
                  defaultValue={`Search in ${movieOrTv}`}
                  onChange={(e:any)=>setSearchTerm(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchOutlined />
                    </IconButton>
                  ),
                }}
              />
             <div id='movieSlide' className='flex   transition  p-3 mt-[2rem]
                    duration-300 ease-in-out   items-center  flex-wrap gap-2 
                    justify-center md:gap-5 md:p-10 
                    overflow-x-scroll scrollbar-hide  '>
                  {resData && resData.filter((flix: any) => {
                       flixName = movieOrTv==="movie"?flix.title:flix.name;
                      if (searchTerm === "") {
                          return flix;
                      }
                      else if (flixName.toLowerCase().includes(searchTerm.toLowerCase())) {
                          return flix;
                      };
                        }).map((flix: any) => 
                        (<div onClick={() => {
                            setMovie(flix);
                            setDisplayModal(true);
                        }} key={flix.id} className='relative h-[14rem]  min-w-[140px] cursor-pointer transition-all 
                        duration-300 ease-out md:h-[20rem] md:min-w-[200px] md:hover:scale-105'>
                           
                            <Image  
                                id='slide-image'
                                className="object-cover cover "
                                layout='fill'
                                src={`${flix.poster_path? cardImagesUrl+flix.poster_path: "http://via.placeholder.com/1080x1580" }`}
                            />
                            
                             <p className={`absolute h-8 w-8 md:w-10 md:h-10  text-black text-sm
                            bottom-[-10px] right-[2rem] rounded-full border-2
                            ${handleRating(flix)! > 50 ? (handleRating(flix)! > 80 ? "text-green-500 border-green-500"
                                    : "text-orange-300 border-orange-300") : "text-red-600 border-red-600"}
                             bg-slate-900 items-center flex justify-center md:font-bold`}>{handleRating(flix)+"%"}</p>
                        </div>)
                        )}
              </div>
          </div>
              {displayModal && <ModalCard/>}
      </div>
  )
}

export default MoviesOrTv