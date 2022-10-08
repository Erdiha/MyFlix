import React, { useEffect,useState } from 'react';
import ReactPlayer from 'react-player';
import { useRecoilState } from 'recoil';
import { api, MAIN_URL, movieID } from '../data/data';
import {Element} from '../data/types'



function VideoPlayer() {
    const [addList, setAddList]: any = useRecoilState(movieID);
    const [trailers, setTrailers]: any = useState();
    
    console.log(addList.id)
  useEffect(() => {
    if (!addList) return

    async function fetchMovie() {
      const data = await fetch(
       `https://api.themoviedb.org/3/${
          addList?.media_type === 'tv' ? 'tv' : 'movie'
        }/${addList?.id}?api_key=${api}&language=en-US&append_to_response=videos`
      ).then((response) => response.json())
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        )
        setTrailers(data.videos?.results[index]?.key)
      }
    }
      fetchMovie();
    }, [addList]);
   console.log(addList)
  return (
      <div className="player-wrapper ">
     <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailers}`}
            width="100%"
            height="80%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
          controls={true}
      />
  </div>
  )
}

export default VideoPlayer