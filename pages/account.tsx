import React from 'react'
import Header from '../components/Header'
import Link from 'next/link';
import useAuth, { userLibrary } from '../data/data';
import { collection, deleteDoc, DocumentData, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { db } from '../fbAuth';
import { useRouter } from 'next/router';
import { deleteUser } from 'firebase/auth';
import { async } from '@firebase/util';
function account() {
  const router = useRouter();
  const { deleteuser, currentUser,isLoading } = useAuth();
  const itemsCount = userLibrary(currentUser?.uid);
  const { logout } = useAuth();
   const handleLogout =  async ()=> {
		  await logout();
	   }
  return (
      <div className=' flex flex-col 
          w-screen h-screen justify-center items-center
          bg-gradient-to-b from-[#000000] to-[rgb(173,221,208)]
     '>
          <Header/>
      <div className='flex flex-col relative mt-[5rem]'>
        <h1 className='text-white text-3xl   '>Account </h1>
        <div className='h-[20rem] w-[20rem] md:h-[20rem] md:w-[20rem]  p-8 pt-[5rem] relative
           bg-black/20 m-auto text-white'>
          <Link href="/"><a className='absolute justify-center flex items-center top-3 right-3 rounded-full bg-gray-800 w-11 h-11 hover:scale-115 text-[20px] font-bold hover:bg-slate-400'> X</a></Link>
          
          <div className='w-full h-[70%] bg-black/-30 flex flex-col justify-center'>
            <p>{currentUser?.email}</p>
            <hr className='border-gray-400 '/>
            <br />
            <p>password: ******</p>
            <hr className="border-gray-400" />
            <br />
            <p>There are { itemsCount.length} movies & Tv shows in your Libarary</p>
          
          </div>
          <button onClick={handleLogout}
            className='absolute bottom-5 left-17 right-17 hover:text-white bg-black/60 rounded-full p-2 text-[1rem] '>
          Log Out</button>
        </div>
        
          </div>
    </div>
  )
}

export default account
