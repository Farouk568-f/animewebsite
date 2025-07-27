// src/services/animeService.ts

import { Media, Episode, HomePageData, DiscoverPageData } from '../types.ts';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

let GENRE_MAP: Record<number, string> = {};
const fetchGenres = async () => {
  if (Object.keys(GENRE_MAP).length > 0) return GENRE_MAP;
  try {
    const movieGenres = await fetchFromTMDB<{ genres: { id: number, name: string }[] }>('genre/movie/list');
    const tvGenres = await fetchFromTMDB<{ genres: { id: number, name: string }[] }>('genre/tv/list');
    [...movieGenres.genres, ...tvGenres.genres].forEach(g => { GENRE_MAP[g.id] = g.name; });
  } catch (error) {
    console.error("Failed to fetch genres:", error);
  }
  return GENRE_MAP;
};

const normalizeMediaData = (item: any): Media => {
  const media_type = item.media_type || (item.first_air_date ? 'tv' : 'movie');
  let genres: { id: number, name: string }[] = [];
  if (Array.isArray(item.genres) && item.genres.length > 0 && typeof item.genres[0] === 'object') {
    genres = item.genres;
  } else if (Array.isArray(item.genre_ids)) {
    genres = item.genre_ids.map((id: number) => ({ id, name: GENRE_MAP[id] || 'Unknown' })).filter((g: { id: number, name: string }) => g.name !== 'Unknown');
  }
  
  return {
    id: item.id,
    title: item.title || item.name || 'Untitled',
    overview: item.overview || '',
    poster_path: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image',
    backdrop_path: item.backdrop_path ? `https://image.tmdb.org/t/p/w1280${item.backdrop_path}` : '',
    vote_average: item.vote_average || 0,
    release_date: item.release_date || item.first_air_date || '',
    genres,
    media_type: media_type,
    // Pass through detailed fields if they exist
    status: item.status,
    tagline: item.tagline,
    imdb_id: item.external_ids?.imdb_id,
    number_of_seasons: item.number_of_seasons,
    number_of_episodes: item.number_of_episodes,
    seasons: item.seasons,
    credits: item.credits,
    videos: item.videos, // Raw videos object
    recommendations: item.recommendations?.results?.map(normalizeMediaData) || [], // Normalize recommendations
  };
};

const fetchFromTMDB = async <T>(endpoint: string): Promise<T> => {
  const separator = endpoint.includes('?') ? '&' : '?';
  const url = `${TMDB_BASE_URL}/${endpoint}${separator}api_key=${API_KEY}&language=en-US`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`TMDb API error! status: ${response.status}, message: ${errorData.status_message || 'Unknown error'}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch from ${endpoint}:`, error);
    throw error;
  }
};

export const getHomePageData = async (): Promise<HomePageData> => {
  await fetchGenres();
  const [trendingRes, popularMoviesRes, topRatedTvRes, upcomingMoviesRes] = await Promise.all([
    fetchFromTMDB<{ results: any[] }>('trending/all/week'),
    fetchFromTMDB<{ results: any[] }>('movie/popular'),
    fetchFromTMDB<{ results: any[] }>('tv/top_rated'),
    fetchFromTMDB<{ results: any[] }>('movie/upcoming'),
  ]);

  return {
    trending: trendingRes.results.filter(i => i.media_type !== 'person').map(normalizeMediaData),
    popularMovies: popularMoviesRes.results.map(normalizeMediaData),
    topRatedTv: topRatedTvRes.results.map(normalizeMediaData),
    upcomingMovies: upcomingMoviesRes.results.map(normalizeMediaData),
  };
};

export const getDiscoverPageData = async (): Promise<DiscoverPageData> => {
  try {
    await fetchGenres();
    const [top10WeekRes, allTimeGrossingRes, popularAnimeRes] = await Promise.all([
      fetchFromTMDB<{ results: any[] }>('trending/tv/week'),
      fetchFromTMDB<{ results: any[] }>('discover/movie?sort_by=revenue.desc'),
      fetchFromTMDB<{ results: any[] }>('discover/tv?with_genres=16&sort_by=popularity.desc&with_original_language=ja'),
    ]);

    return {
      top10Week: (top10WeekRes.results || []).slice(0, 10).map(normalizeMediaData),
      allTimeGrossing: (allTimeGrossingRes.results || []).map(normalizeMediaData),
      popularAnime: (popularAnimeRes.results || []).map(normalizeMediaData),
    };
  } catch (error) {
    console.error('Error fetching discover page data:', error);
    // Return empty arrays if there's an error
    return {
      top10Week: [],
      allTimeGrossing: [],
      popularAnime: [],
    };
  }
};

export const getKidsHomePageData = async (): Promise<HomePageData> => {
  await fetchGenres();
  const params = 'certification_country=US&certification.lte=G&with_genres=16,10751&sort_by=popularity.desc';
  const [trendingRes, popularMoviesRes, topRatedTvRes, upcomingMoviesRes] = await Promise.all([
    fetchFromTMDB<{ results: any[] }>(`discover/movie?${params}`),
    fetchFromTMDB<{ results: any[] }>(`discover/movie?${params}`),
    fetchFromTMDB<{ results: any[] }>(`discover/tv?${params}`),
    fetchFromTMDB<{ results: any[] }>(`discover/movie?${params}&release_date.gte=${new Date().getFullYear()}-01-01`),
  ]);
  return {
    trending: trendingRes.results.map(normalizeMediaData),
    popularMovies: popularMoviesRes.results.map(normalizeMediaData),
    topRatedTv: topRatedTvRes.results.map(normalizeMediaData),
    upcomingMovies: upcomingMoviesRes.results.map(normalizeMediaData),
  };
};

export const searchMedia = async (query: string): Promise<Media[]> => {
  if (!query.trim()) return [];
  await fetchGenres();
  const searchEndpoint = `search/multi?query=${encodeURIComponent(query)}&include_adult=false`;
  const data = await fetchFromTMDB<{ results: any[] }>(searchEndpoint);
  return data.results
    .filter(item => item.media_type === 'movie' || item.media_type === 'tv')
    .map(normalizeMediaData);
};

export const getMediaDetails = async (id: number, media_type: 'movie' | 'tv'): Promise<Media> => {
  await fetchGenres();
  const detailsEndpoint = `${media_type}/${id}?append_to_response=credits,videos,recommendations,external_ids`;
  const data = await fetchFromTMDB<any>(detailsEndpoint);
  return normalizeMediaData({ ...data, media_type });
};

export const getTvSeasonDetails = async (tvId: number, seasonNumber: number): Promise<Episode[]> => {
  const seasonEndpoint = `tv/${tvId}/season/${seasonNumber}`;
  const data = await fetchFromTMDB<{ episodes: any[] }>(seasonEndpoint);
  return data.episodes.map(ep => ({
    id: ep.id,
    name: ep.name,
    overview: ep.overview,
    episode_number: ep.episode_number,
    season_number: ep.season_number,
    still_path: ep.still_path ? `https://image.tmdb.org/t/p/w300${ep.still_path}` : null,
    vote_average: ep.vote_average,
  }));
};

export async function imdbToTmdb(imdbId: string, apiKey: string): Promise<number | null> {
  const url = `https://api.themoviedb.org/3/find/${imdbId}?api_key=${apiKey}&external_source=imdb_id`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.movie_results && data.movie_results.length > 0) {
      return data.movie_results[0].id;
    }
    if (data.tv_results && data.tv_results.length > 0) {
      return data.tv_results[0].id;
    }
    return null;
  } catch (e) {
    return null;
  }
}