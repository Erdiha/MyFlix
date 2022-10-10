import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MorT,navItemSelection } from '../data/data';
import { useRecoilState } from 'recoil';



function Header() {
	const [scrolling, setScrolling] = useState(false);
	const [movieOrTv, setmovieOrTv] = useRecoilState(MorT);
	const [activeClass, setActiveClass] = useRecoilState(navItemSelection);


	useEffect(() => {
	  	
    const scrll = () => {
    window.scrollY > 0?setScrolling(true):setScrolling(false);
    };
    window.addEventListener('scroll', scrll);
    return () => { 
      window.removeEventListener('scroll', scrll);
    }
},[movieOrTv])
 
const handleClick = (e: any) => {
	const btn = document.querySelectorAll("button.mobile-menu-button")!;
	const menu = document.querySelector(".mobile-menu")!;
	const items = document.querySelectorAll(".item")!;
   
    if (btn && menu) {
      menu.classList.toggle("hidden");
    }
  
  
	// if (e.target.innerHTML === "Home") {
	// 	setActiveClass((prev: any) => { return { ...prev, home: true, library: false, movies: false } })
	// }
	// else if (e.target.innerHTML === "My Library") {
	// 	setActiveClass((prev: any) => { return { ...prev, home: false, library: true, movies: false } })
	// }
	// else if (e.target.innerHTML === "Movies & TV") {
	// 	setActiveClass((prev: any) => { return { ...prev, home: false, library: false, movies: true } })
	// }; 

	
		// items.forEach(i => {
		// 	if (e.target === i) {
		// 		i.classList.add("border-[#ADDDD0]")
		// 	}
		// 	else {
		// 		i.classList.remove("border-[#ADDDD0]")
		// 	}
		// })

  };

console.log(activeClass)
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
							<Link href="/"><a onClick={(e:any)=>handleClick(e)}   className={`item`}>Home</a></Link>
						  	<Link href="/MoviesOrTv"><a onClick={(e:any)=>handleClick(e)}  className={`item`}>Movies & TV</a></Link>
							<Link href="/MyLibrary"><a onClick={(e:any)=>handleClick(e)} className={`item`}>My Library</a></Link>
						</div>
					</div>
					<div className="hidden md:flex items-center space-x-5 ">
					  <Link href="/account"><a  className="py-2 px-2 font-medium 
						 text-gray-400 rounded outline hover:bg-[#ADDDD0] hover:text-black hover:scale-105
						  transition duration-300">Account</a></Link>
					 
					</div>
					<div className=" md:hidden flex items-center">
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
			<div className="md:hidden hidden mobile-menu text-white">
			  <ul >
				<Link href="/"><li ><a  className="mobile-navbar-items">Home</a></li></Link>
				<Link href="/MoviesOrTv"><li ><a  className="mobile-navbar-items">Movies & TV</a></li></Link>
				<Link href="/MyLibrary"><li ><a  className="mobile-navbar-items">My Library </a></li></Link>
				</ul>
			</div>
	
		</nav>
  )
}

export default Header


