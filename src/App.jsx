import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/UseMovies'
import { useSearch } from './hooks/UseSearch'
import { useState, useCallback } from 'react'
import debounce from 'just-debounce-it'

function App () {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, validation } = useSearch()
  const { movies, getMovies, loading, error } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    }, 300)
    , [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>Movie Searcher</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wars, The Matrix...' />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Search</button>
        </form>
        {validation && <p style={{ color: 'red' }}>{validation}</p>}
      </header>
      <main>
        <Movies movies={movies} loading={loading} />
        {error && <p>{error}</p>}
      </main>
    </div>
  )
}

export default App
