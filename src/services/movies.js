import apiKey from '../data/credentials.json'
import dataMovies from '../data/endpoint.json'

export const searchMovies = async ({ search }) => {
  if (!search) return

  try {
    const response = await fetch(`${dataMovies.ENDPOINT_MOVIES}apikey=${apiKey.API_KEY}&s=${search}`)
    const json = await response.json()

    const movies = json.Search

    return movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      image: movie.Poster
    }))
  } catch (e) {
    throw new Error('Error searching movies')
  }
}
