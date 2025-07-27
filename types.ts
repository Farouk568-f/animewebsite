// src/types.ts

export interface Genre {
  id: number;
  name: string;
}

// New types for details page
export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface CrewMember {
  id: number;
  name:string;
  job: string;
  profile_path: string | null;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface Media {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  release_date: string;
  genres: Genre[];
  media_type: 'movie' | 'tv';
  imdb_id?: string | null;
  seasons?: any[];
  // Added properties
  tagline?: string | null;
  videos?: { results: Video[] };
  credits?: { cast: CastMember[], crew: CrewMember[] };
  recommendations?: Media[];
  status?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
}

export interface Episode {
    id: number;
    name: string;
    overview: string;
    episode_number: number;
    season_number: number;
    still_path: string | null;
    vote_average: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface VideoInfo {
    id: string;
    title: string;
    thumbnailUrl: string;
    duration: string;
    formats: DownloadFormat[];
}

export interface DownloadFormat {
    format_id: string;
    ext: string;
    resolution: string;
    note?: string;
    filesize: number | null;
    vcodec?: string;
    acodec?: string;
    type: 'video' | 'audio';
}

export interface Testimonial {
    name: string;
    title: string;
    avatarUrl: string;
    rating: number;
    text: string;
}

export interface Part {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}

export interface Profile {
  id: string;
  name: string;
  avatarUrl: string;
  kids?: boolean;
}

export interface HomePageData {
    trending: Media[];
    popularMovies: Media[];
    topRatedTv: Media[];
    upcomingMovies: Media[];
}

export interface DiscoverPageData {
  top10Week: Media[];
  allTimeGrossing: Media[];
  popularAnime: Media[];
}