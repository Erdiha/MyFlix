
import React from "react";


const api = process.env.NEXT_PUBLIC_API_KEY;
const MAIN_URL = "https://api.themoviedb.org/3";
export  const all_data = {
   fetchTrending: `${MAIN_URL}/trending/all/week?api_key=${api}&language=en-US`,
  fetchNetflixOriginals: `${MAIN_URL}/discover/movie?api_key=${api}&with_networks=213`,
  fetchTopRated: `${MAIN_URL}/movie/top_rated?api_key=${api}&language=en-US`,
  fetchActionMovies: `${MAIN_URL}/discover/movie?api_key=${api}&language=en-US&with_genres=28`,
  fetchComedyMovies: `${MAIN_URL}/discover/movie?api_key=${api}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `${MAIN_URL}/discover/movie?api_key=${api}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `${MAIN_URL}/discover/movie?api_key=${api}&language=en-US&with_genres=10749`,
  fetchDocumentaries: `${MAIN_URL}/discover/movie?api_key=${api}&language=en-US&with_genres=99`,
}

export const HeroMovieImageUrl = 'https://image.tmdb.org/t/p/original/';

export const cardImagesUrl = 'https://image.tmdb.org/t/p/w500';
export const titles = ["Action Movies", "Comedy Movies", "Horror Movies",
  "Top Rated", "Trending Now", "Romantic Movies", "Documentaries"];
export const movieGenres = ["props.actionMovies",
  "props.comedyMovies",
  "props.horrorMovies", "props.topRated", "props.trendingNow",
  "props.romanceMovies", "props.documentaries"]
