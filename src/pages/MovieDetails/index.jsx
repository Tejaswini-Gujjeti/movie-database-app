import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {getMovieCast, getMovieDetails} from '../../utils/api'
import CastCard from '../../components/CastCard'
import './index.css'

function MovieDetails() {
  const {id} = useParams()
const [movie, setMovie] = useState(null)
const [cast, setCast] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true)

        const data = await getMovieDetails(id)

        setMovie(data)
        const castData = await getMovieCast(id)

setCast(castData)
      } catch (err) {
        setError('Unable to fetch movie details')
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [id])

  if (loading) {
    return <h1>Loading movie details...</h1>
  }

 if (error) {
  return (
    <div className="error-message">
      <h2>Something went wrong</h2>
      <p>{error}</p>
    </div>
  )
}

  return (
  <main className="movie-details">
    <section
      className="movie-hero"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="hero-overlay">
        <div className="details-container">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="details-poster"
          />

          <div className="details-info">
            <h1>{movie.title}</h1>

            <div className="movie-meta">
              <span>⭐ {movie.vote_average?.toFixed(1)}</span>
              <span>{movie.release_date}</span>
              <span>{movie.runtime} min</span>
            </div>

            <div className="genre-list">
              {movie.genres?.map(genre => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </div>

            <h2>Overview</h2>

            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
    </section>

    <section className="cast-section">
      <h2>Cast</h2>

      <div className="cast-grid">
        {cast.slice(0, 10).map(castMember => (
          <CastCard
            key={castMember.cast_id || castMember.id}
            castMember={castMember}
          />
        ))}
      </div>
    </section>
  </main>
)
}

export default MovieDetails