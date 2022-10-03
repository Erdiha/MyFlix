import React, { useEffect, useState } from 'react';
import popcorn from '../assets/popcorn.png'
import Link from 'next/link'
function Header() {
  const [scrolling, setScrolling] = useState(false);
  useEffect(() => {

    //   const getList = document.querySelectorAll<HTMLElement>('.item');
    // getList.forEach((item) => {
    //   item.addEventListener("click", (e) => {
    //     console.log(e);
    //     const target = e.target as Element;
    //     target === item ? item.classList.add("active") : item.classList.remove("active");
    //   })
    // }
    // );
    const scrll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      
      }
      else {
        setScrolling(false);
      }
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
		<nav className={`${scrolling && 'bg-opacity-0'} bg-[#d0d0d0] shadow-lg w-full`}>
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex justify-between w-full">
					<div className="flex space-x-7">
						<div>
							<a href="#" className="flex items-center py-4 px-2">
								<span className="font-semibold text-gray-500 text-lg">MyFlix</span>
							</a>
						</div>
            <div className=" hidden md:flex items-center justify-center space-x-10">
							<span className="item py-4 px-2 transition duration-300 ">Home</span>
							<span className="item py-4 px-2 transition duration-300">Movies</span>
							<span className="item py-4 px-2 transition duration-300">Tv Shows</span>
							<span className="item py-4 px-2 transition duration-300">My Library</span>
						</div>
					</div>
					<div className="hidden md:flex items-center space-x-5 ">
						<a href="" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Log In</a>
						<a href="" className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">Sign Up</a>
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
					<li className="active"><a href="index.html" className="block text-sm px-2 py-4 text-white bg-green-500 font-semibold">Home</a></li>
					<li><a href="#services" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Services</a></li>
					<li><a href="#about" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">About</a></li>
					<li><a href="#contact" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Contact Us</a></li>
				</ul>
			</div>
	
		</nav>
  )
}

export default Header
