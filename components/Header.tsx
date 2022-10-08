import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MorT } from '../data/data';
import { useRecoilValue,useRecoilState } from 'recoil';

function Header() {
	const [scrolling, setScrolling] = useState(false);
	const [movieOrTv,setmovieOrTv] = useRecoilState(MorT);

  useEffect(() => {
    const scrll = () => {
    window.scrollY > 0?setScrolling(true):setScrolling(false);
    };
    window.addEventListener('scroll', scrll);
    return () => { 
      window.removeEventListener('scroll', scrll);
    }
},[])
 
  const handleClick = (e: any) => {
    const btn = document.querySelector("button.mobile-menu-button")!;
    const menu = document.querySelector(".mobile-menu")!;
   
    if (btn && menu) {
      menu.classList.toggle("hidden");
    }
  };
  

  return (
		<nav className={`${scrolling && 'bg-opacity-[0.9]'} bg-[#000000] shadow-lg w-full`}>
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex justify-between w-full">
					<div className="flex space-x-7">
						<div>
							<a href="#" className="flex items-center py-4 px-2">
								<span className="font-semibold text-red-100 text-3xl">MyFlix</span>
							</a>
						</div>
            <div className=" hidden md:flex items-center justify-center space-x-10 text-red-100">
							<Link href="/"><a   className="item py-4 px-2 transition duration-300 ">Home</a></Link>
						  <Link href="/MoviesOrTv"><a onClick={() => setmovieOrTv("movie")}
							  className="item py-4 px-2 transition duration-300">Movies</a></Link>
							<Link href="/MoviesOrTv"><a onClick={() => setmovieOrTv("tv")} className="item py-4 px-2 transition duration-300">Tv Shows</a></Link>
							<Link href="/MyLibrary"><a className="item py-4 px-2 transition duration-300">My Library</a></Link>
						</div>
					</div>
					<div className="hidden md:flex items-center space-x-5 ">
					  <Link href="/account"><a  className="py-2 px-2 font-medium 
						 text-gray-500 rounded outline hover:bg-[#ADDDD0] hover:text-black hover:scale-105
						  transition duration-300">Account</a></Link>
					 
					</div>
					<div className="md:hidden flex items-center">
						<button onClick={handleClick} className="outline-none mobile-menu-button">
						<svg className=" w-6 h-6 text-gray-500 hover:text-green-500 "
							x-show="!showMenu"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path d="M4 6h16M4 12h16M4 18h16"></path>
						</svg>
					</button>
					</div>
				</div>
			</div>
			<div className="hidden mobile-menu">
			  <ul className="">
				  <Link href="/"><li className="active"><a  className="block text-sm px-2 py-4 text-white bg-green-500 font-semibold">Home</a></li>
				</Link>
					<Link href="/MoviesOrTv"><li><a onClick={()=>setmovieOrTv("movie")} className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Movies</a></li></Link>
					<Link href="/MoviesOrTv"><li><a onClick={()=>setmovieOrTv("tv")} className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Tv Shows</a></li></Link>
					<Link href="/MyLibrary"><li><a  className="block text-sm px-2 py-4 hover:bg-[ #ADDDD0] transition duration-300">My Library </a></li></Link>
				</ul>
			</div>
	
		</nav>
  )
}

export default Header


