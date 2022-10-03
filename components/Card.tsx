import React from 'react'
import { Iprops,Movie } from '../data/types'
import Image from 'next/image'
import { cardImagesUrl } from '../data/data';


interface IProps {
  movie: Movie
}
 
function Card({ movie }: IProps) {
    console.log("in card ",movie)
  return (
    <div className='relative min-w-[200px] h-25'>
          <Image
              className="object-cover"
              layout='fill'
              src={`${cardImagesUrl}${movie.backdrop_path || movie.poster_path} `}
          />
    </div>
  )
}
export default Card

