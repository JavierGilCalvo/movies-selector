import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search)

  const getMovies = useCallback(async ({ search }) => { // No se construye la función cada vez que se renderiza el useMovies
    if (search === previousSearch) return
    try {
      setLoading(true)
      setError(null)
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, []) // Llamamos solo la primera vez

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => {
          return a.title.localeCompare(b.title)
        })
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading, error }
}
