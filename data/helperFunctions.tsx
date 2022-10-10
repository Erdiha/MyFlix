import { MAIN_URL,api } from './data'
import React,{useEffect,useState} from 'react';

//handles the long titles
export const handleLongSentences = (item: any,limit:number) => {
  if (item) {
    
    return item.length > limit ? item.substring(0, limit) + "..." : item
  };     
};
//handles the rating
export const handleRating = (flix: any) => {
      
  if (flix) {
    const rating = flix.vote_average * 10 + "%";
     const num = parseInt(rating)
    return Math.round(num * 10) / 10;
  };
        
};

//helper function for genre generation
export const generateGenre = ({setGenre,genre }:any) => {
    useEffect(() => {
            async function getAll() {
            const allData = await fetch(
                `${MAIN_URL}/genre/movie/list?api_key=${api}&language=en=US`
            ).then((response) => response.json()).catch((error) => { alert(error.message) });
             setGenre(allData.genres)
        };
        getAll();
    }, []);
  return genre;
}
