import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import useAuth,{ all_data,titles,userLibrary } from '../data/data';
import {  Movie } from '../data/types';
import Section from '../components/Section';
//import ModalCard from '../components/ModalCard';
interface IProps {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
}

const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
  }: IProps) => {
  const { currentUser } = useAuth();
  const movieGenres = [actionMovies,
  comedyMovies, horrorMovies,
  topRated, trendingNow,
  romanceMovies, documentaries];
  const lib = userLibrary(currentUser?.uid)

  const sec: any = [];
  let lower = 0;
  if (lib?.length > 0) {
    lower = 1;
      sec.push(<Section key={0} title ={titles[7]}  flixes={lib} />)
  } 

  const sectionStrips = () => {
    for (let i = lower; i < 8; i++){
        sec.push(<Section key={i} title ={titles[i-1]}  flixes={movieGenres[i-1]} />)
    }
   
    return sec;
  };
  return <div className="relative h-screen w-screen
      
     ">
      <Head>
        <title>MyFlix</title>
      </Head>
   <Header/>
      <main className='relative w-screen   bg-gradient-to-t from-[rgb(173,221,208)] to-black pb-24 lg:space-y-24 lg:pl-1 ' >
      
      <Hero netflixOriginals={netflixOriginals} />
      {sectionStrips()}
      
    </main>
    {/* {displayModal && <ModalCard/>} */}
    
  </div>
  
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