import type { NextPage,GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect } from 'react';
import Header from '../components/Header'
import Hero from '../components/Hero'
import { all_data,titles } from '../data/data';
import { Movie, Genre, Element, Iprops } from '../data/types';
import Section from '../components/Section';

 

const Home = (props: (Iprops)) => {
  
 const movieGenres = [props.actionMovies,
   props.comedyMovies, props.horrorMovies,
   props.topRated, props.trendingNow,
  props.romanceMovies, props.documentaries]
  const sec:any = [];
  const sectionStrips = () => {
    for (let i = 0; i < 7; i++){
        sec.push(<Section  title ={titles[i]}  flixes={movieGenres[i]} />)
    }
    return sec;
    
  };
  return (
    <div className="relative h-screen w-screen
    bg-gradient-to-b 
     ">
      <Head>
        <title>MyFlix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
   <Header/>
      <main >
        <Hero netflixOriginals={props.netflixOriginals} />
        {sectionStrips()}
      </main>
    </div>
  )
}

export default Home

 export const getServerSideProps:GetServerSideProps = async () => {
  const [netflixOriginals, trendingNow, topRated, actionMovies,
    comedyMovies, horrorMovies, romanceMovies, documentaries] = await Promise.all([
      fetch(all_data.fetchNetflixOriginals).then((result) => result.json()),
      fetch(all_data.fetchTrending).then((result) => result.json()),
      fetch(all_data.fetchTopRated).then((result) => result.json()),
      fetch(all_data.fetchActionMovies).then((result) => result.json()),
      fetch(all_data.fetchComedyMovies).then((result) => result.json()),
      fetch(all_data.fetchHorrorMovies).then((result) => result.json()),
      fetch(all_data.fetchRomanceMovies).then((result) => result.json()),
      fetch(all_data.fetchDocumentaries).then((result) => result.json()),
    ]);
  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    }
  }
}