
import React, {
  useState,
  createContext,
  useContext,
  useEffect
} from "react";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  deleteUser,
} from "firebase/auth";
import { useRouter } from 'next/router';
import {auth} from '../fbAuth'
import { atom } from 'recoil';
import { collection,deleteDoc,DocumentData,onSnapshot,doc} from 'firebase/firestore';
import { Movie } from "./types";
import { db } from "../fbAuth";

 export const api = process.env.NEXT_PUBLIC_API_KEY;
export const MAIN_URL = "https://api.themoviedb.org/3";
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
//genre ids
export const GENRE_URL ="https://developers.themoviedb.org/3/genres/get-movie-list"
//url for hero image
export const HeroMovieImageUrl = 'https://image.tmdb.org/t/p/original/';
//url for movie strips image
export const cardImagesUrl = 'https://image.tmdb.org/t/p/w500';
//titles of movies
export const titles = ["Action Movies", "Comedy Movies", "Horror Movies",
  "Top Rated", "Trending Now", "Romantic Movies", "Documentaries","My Movies"];
//predefined names for movie genre_ids
export const movieGenres = ["props.actionMovies",
  "props.comedyMovies",
  "props.horrorMovies", "props.topRated", "props.trendingNow",
  "props.romanceMovies", "props.documentaries"];
//for login
 export interface IGenre   {
     flixes: Movie[] | DocumentData[],
     title:string
}
export interface Iinput  {
    email: string,
    password:string
}
//for register
export interface IRegister{
  email: string,
  password: string,
  repassword:string
}

//our autentication settings for firebase
interface AProps{
  children:React.ReactNode
}

interface IAuth{
  currentUser: User | null,
  isLoading: boolean,
  logIn: (email: string, password: string) => Promise<void>,
  logout: () => Promise<void>,
  Register: (email: string, password: string) => Promise<void>,
  deleteuser:()=> Promise<void>,
}

const AuthContext = createContext<IAuth>({
  //set user credential and variables to null
  currentUser: null,
  isLoading: false,
  //function to get object from auth
  logIn: async () => {},
  logout: async () => {},
  Register: async () => { },
  deleteuser: async () => { }
});


export const AuthProvider = ({ children }: AProps) => {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [firstLoading, setFirstLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          
          setCurrentUser(user)
          setIsLoading(false)
        } else {
          setCurrentUser(null)
          setIsLoading(true)
          router.push('/signin')
        }
        setFirstLoading(false)
      }),
    [auth]
  )

  const Register = async (email: string, password: string) => {
    setIsLoading(true)

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userinfo) => {
        setCurrentUser(userinfo.user)
        router.push('/')
        setIsLoading(false)
      })
      .catch((error) => alert(error.message))
      .finally(() => setIsLoading(false))
  }

  const logIn = async (email: string, password: string) => {
    setIsLoading(true)
    await signInWithEmailAndPassword(auth, email, password)
      .then((userinfo) => {
        setCurrentUser(userinfo.user)
        router.push('/')
        setIsLoading(false)
      })
      .catch((error) => alert(error.message))
      .finally(() => setIsLoading(false))
  }

  const logout = async () => {
    setIsLoading(true)

    signOut(auth)
      .then(() => {
        setCurrentUser(null)
      })
      .catch((error) => alert(error.message))
      .finally(() => setIsLoading(false))
  }
  const deleteuser = async () => {
       const docRef = doc(db, "users", currentUser!.uid);
     currentUser && await deleteUser(currentUser);
   await deleteDoc(docRef);
  };

  

//return authcontext
  return (
    <AuthContext.Provider value={{ currentUser, logIn, logout, Register, isLoading,deleteuser }}>
      {!firstLoading && children}
    </AuthContext.Provider>
  )
};
//export the settings
export default function useAuth() {
  return useContext(AuthContext);
};

//recoil atom state
export const movieState = atom({
  key: 'movieState',
  default:false
})

export const movieID = atom<null | Movie |DocumentData >({
  key: 'movieID',
  default: null
});
export const userLib = atom<null | DocumentData[] |Movie[]>({
  key: 'userLib',
  default: null
});

export const addOrRemove = atom({
  key:'addOrRemove',
  default: false
})

export const MorT = atom({
  key:'MorT',
  default: ""
})
export const textadd = atom({
  key: 'textadd',
  default: ""
});
export const playTrailer = atom({
  key: 'playTrailer',
  default: false
})


export const userLibrary = (UID: undefined | string) => {
  const [getList, setGetList] = useState<Movie[] | DocumentData[]>([]);
  useEffect(() => {
    if (!UID) return

    return onSnapshot(
      collection(db, 'users', UID, 'myLib'),
      (snapshot) => {
        setGetList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      }
    )
  }, [db, UID]);

  return getList;
};

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

