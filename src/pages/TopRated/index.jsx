import {useEffect, useState} from 'react'
import Pagination from '../../components/Pagination'
import MovieGrid from '../../components/MovieGrid'
import {getTopRatedMovies} from '../../utils/api'
import Loader from '../../components/Loader'
import './index.css'

function TopRated() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
const [totalPages, setTotalPages] = useState(1)
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)

        const data = await getTopRatedMovies(page)

setMovies(data.results)
setTotalPages(data.total_pages)
      } catch (err) {
        setError('Unable to fetch top rated movies')
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [page])
  const handlePageChange = newPage => {
  setPage(newPage)
}

if (loading) {
  return <Loader />
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
  <main>
    <div className="page-header">
  <h1 className="page-title">Top Rated Movies</h1>
  <p>Discover the highest-rated movies on TMDB.</p>
</div>
    <MovieGrid movies={movies} />

    <Pagination
      currentPage={page}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  </main>
)
}

export default TopRated