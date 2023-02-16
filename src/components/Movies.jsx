function ListOfMovies ({ movies }) {
  return (
    <ul className='movies'>
      {movies.map(movie => {
        return (
          <li className='movie' key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.image} alt={movie.title} />
          </li>
        )
      })}
    </ul>
  )
}

function NoMoviesResults () {
  return (
    <p>No hay películas...</p>
  )
}

export function Movies ({ movies, loading }) {
  const hasMovies = movies && movies.length > 0
  return (
    hasMovies
      ? <ListOfMovies movies={movies} />
      : loading ? <p>Cargando...</p> : <NoMoviesResults />
  )
}
