export type Genre = {
    id: number,
    name:string
}

export interface Movie{
    id: number,
    name: string,
    title: string,
    original_name: string,
    origin_country: string,
    original_language:string,
    vote_count:number,
    backdrop_path: string,
    media_type?: string,
    release_date?: string,
    first_air_date: string,
    genre_ids: number[],
    poster_path: string,
    vote_average: number,
    popularity:number,
    overview: string,
    adult:boolean
}

export interface Element{
    type:
    | 'Bloopers' | 'Featurette' | 'Behind the Scenes'
    |'Clip' | 'Trailer' | 'Teaser'
}

export interface Iprops{
    netflixOriginals:  Movie[], 
    trendingNow:  Movie[],
    topRated:  Movie[],
    actionMovies:   Movie[],
    comedyMovies:  Movie[],
      horrorMovies:  Movie[],
      romanceMovies:  Movie[],
      documentaries:  Movie[],
}

