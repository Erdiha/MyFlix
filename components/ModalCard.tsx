import React,{useState,useEffect} from 'react';
import {useRecoilState } from 'recoil';
import useAuth,{
  movieState, movieID, cardImagesUrl, api, 
  handleLongSentences, addOrRemove,playTrailer, MAIN_URL, generateGenre, textadd
} from '../data/data';
import MuiModal from '@mui/material/Modal'
import {
  collection, deleteDoc, DocumentData, onSnapshot, doc,
  setDoc
} from 'firebase/firestore';
import { db } from '../fbAuth';
import { Movie } from '../data/types';
import { TiTick, TiPlus } from 'react-icons/ti';
import VideoPlayer from './VideoPlayer';

function ModalCard() {
 
  const [displayModal, setDisplayModal] = useRecoilState(movieState)
  const { currentUser } = useAuth();
  const [addList, setAddList]: any = useRecoilState(movieID)
  const [addLib, setAddLib] = useState<DocumentData[] | Movie[]>([]);
  const [movieExists, setMovieExists] = useRecoilState(addOrRemove);
  const getAdd = document.querySelector(".add-alert")!;
  const [addOrDelete, setaddOrDelete] = useState("");
  const [genre, setGenre]:any = useState([]);
  const flixGenre: JSX.Element[] = [];
  const getGenre = generateGenre({ setGenre, genre });
  const [textAdd,setTextAdd] =useRecoilState(textadd);
  const [pTrailer, setPTrailer] = useRecoilState(playTrailer);


  const addMoviesToLibrary = async () => {
    const userID = currentUser!.uid;
    !movieExists ?
    await setDoc(doc(db, "users", userID, 'myLib', addList?.id.toString()!), { ...addList }) :
    await deleteDoc(doc(db, 'users', currentUser!.uid, 'myLib', addList?.id.toString()!));
    movieExists ? setaddOrDelete("Item Removed") : setaddOrDelete("Item added");
   
    getAdd && getAdd.classList.add("flex");
    setTimeout(() => {
            getAdd && getAdd.classList.remove("flex");
    }, 2000);
  };

  useEffect(() => {
     movieExists ? setTextAdd("Remove") : setTextAdd("Add");
    if (currentUser) {
      return onSnapshot(
        collection(db, 'users', currentUser.uid, 'myLib'),
        (snapshot) => setAddLib(snapshot.docs)
      )
    };
  }, [db, addList.id,movieExists]);
  
  useEffect(() => {
    const found = addLib.some((result: any) => { return result.data().id === addList.id })
    setMovieExists(found)
    },
    [addLib]
  );

  useEffect(() => {
            async function getAll() {
            const allData = await fetch(
                `${MAIN_URL}/genre/movie/list?api_key=${api}&language=en=US`
            ).then((response) => response.json()).catch((error) => { alert(error.message) });
             setGenre(allData.genres)
        };
        getAll();
  }, []);

  
  const handleGenre = (item: []) => {
   getGenre.map((x: any,index:any) => {
     item.map((y: any ) => {
       
       x.id === y && flixGenre.push(<p>{`${x.name}`}</p>)
    })});
   return flixGenre
  };

  return <MuiModal onClose={() => {
    setDisplayModal(false);
    setAddList(null);
    setPTrailer(false);
  }} open={displayModal}>
    <div className='flex felx-col w-screen h-screen items-center justify-center'>
      <div className='flex flex-col h-[38rem] w-[22rem] md:w-[33rem] md:h-[45rem]  
       bg-gradient-to-t from-[rgb(173,221,208)] to-black
              items-center   relative opacity-1'>
        <button className="close-button absolute  top-[2%] right-[5%] text-2xl bg-[#ADDDD0] 
      rounded-full w-[3rem] h-[3rem] z-100"
        onClick={() => setDisplayModal(false)}> <b>X</b> </button>
        <div className="flex flex-col space-y-2 p-2 mt-[7rem]  gap-2
      h-[30rem] items-center  md:h-[33rem]" >
          <p className='  font-bold text-[1.5rem] text-white'> {addList.title}</p>
     
          {pTrailer ? <VideoPlayer /> :<>
              <img className='imgContainer' src={`${cardImagesUrl + addList.backdrop_path || addList.poster_path}`}/>
         
          <div className=' text-sm lg:text-[18px] leading-6 w-full
              max-w-full m- p-1  font-semibold absolute bottom-[17rem] flex flex-row
              ml-3
              md:max-w-lg md:text-md lg:max-w-2xl gap-1 
          '>{handleGenre(addList.genre_ids)}</div>
          
          <p className=' text-sm lg:text-[18px] leading-6 
              absolute bottom-[6rem] max-w-full m-1 p-1 md:m-[10px] md:p-[15px]
              md:max-w-lg md:text-md lg:max-w-2xl text-slate-200
               '>{handleLongSentences(addList?.overview,300)}</p>
            </>
          }
          <div className='flex flex-row absolute bottom-8 space-x-3 left-10'>
            
            <button onClick={() => setPTrailer((prev:any) => !prev)}
              className='hover:bg-red-300 hover:scale-[1.05] border-2
             border-gray-900  h-10 w-20 
                  rounded font-bold bg-[#b0dcd0] '>
              {`${pTrailer ? "Close" : "Play"}`}</button>
            <>
               <button onClick={addMoviesToLibrary} 
              className={`hover:md:bg-red-300 flex justify-center text-center md:w-[8rem] ${pTrailer&&"text-slate-100"}
              items-center text-[1rem] font-bold h-10 w-24 rounded-full border${pTrailer ? "border-red-100": " border-red-600"}
              font-bold]`}>
              {!movieExists ? (<TiPlus className='add-tick' />) : (<TiTick className='add-tick' />)}
              {textAdd}
            </button>
            </>
           
          </div>
          <p className='add-alert  text-slate-300'>{ addOrDelete}</p>
      </div>
      </div>
      <div className='relative'>
       
      </div>
      </div>
      
  </MuiModal>
    
};

export default ModalCard
