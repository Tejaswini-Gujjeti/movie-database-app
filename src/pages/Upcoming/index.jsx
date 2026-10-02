import {useEffect, useState} from 'react'

import MovieGrid from '../../components/MovieGrid'
import Pagination from '../../components/Pagination'
import {getUpcomingMovies} from '../../utils/api'

import './index.css'

function Upcoming() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)

        const data = await getUpcomingMovies(page)

        setMovies(data.results)
        setTotalPages(data.total_pages)
      } catch (err) {
        setError('Unable to fetch upcoming movies')
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
    return <h1>Loading movies...</h1>
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
  <h1 className="page-title">Upcoming Movies</h1>
  <p>Keep an eye on movies coming soon.</p>
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

export default Upcoming