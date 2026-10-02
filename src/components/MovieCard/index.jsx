import {Link} from 'react-router-dom'
import './index.css'

function MovieCard({movie}) {
  const {id, title, poster_path, vote_average, release_date} = movie

  return (
    <Link to={`/movie/${id}`} className="movie-card">
      <div className="poster-container">
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : 'https://via.placeholder.com/500x750?text=No+Poster'
          }
          alt={title}
          className="movie-poster"
        />

        <span className="rating-badge">
          ⭐ {vote_average?.toFixed(1)}
        </span>
      </div>

      <div className="movie-info">
        <h2>{title}</h2>
        <p>{release_date || 'Release date unavailable'}</p>
      </div>
    </Link>
  )
}

export default MovieCard