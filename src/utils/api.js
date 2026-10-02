const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const BASE_URL = 'https://api.themoviedb.org/3'

export const getPopularMovies = async page => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
  )

  if (!response.ok) {
    throw new Error('Failed to fetch popular movies')
  }

  return response.json()
}

export const getTopRatedMovies = async page => {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`,
  )

  if (!response.ok) {
    throw new Error('Failed to fetch top rated movies')
  }

  return response.json()
}

export const getUpcomingMovies = async page => {
  const response = await fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`,
  )

  if (!response.ok) {
    throw new Error('Failed to fetch upcoming movies')
  }

  return response.json()
}

export const searchMovies = async (movieName, page) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
      movieName,
    )}&page=${page}`,
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.status_message || 'Failed to search movies')
  }

  return data
}

export const getMovieDetails = async movieId => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.status_message || 'Failed to fetch movie details')
  }

  return data
}
export const getMovieCast = async movieId => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.status_message || 'Failed to fetch movie cast')
  }

  return data.cast
}