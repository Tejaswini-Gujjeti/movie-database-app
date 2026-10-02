import {useEffect, useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import Loader from '../../components/Loader'
import MovieGrid from '../../components/MovieGrid'
import Pagination from '../../components/Pagination'
import {searchMovies} from '../../utils/api'

import './index.css'

function SearchResults() {
  const [searchParams] = useSearchParams()

  const query = searchParams.get('query') || ''

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await searchMovies(query, page)

        setMovies(data.results)
        setTotalPages(data.total_pages)
      } catch (err) {
        setError('Unable to search movies')
      } finally {
        setLoading(false)
      }
    }

    if (query.trim() !== '') {
      fetchSearchResults()
    }
  }, [query, page])

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
      <h1 className="page-title">
        Search Results for "{query}"
      </h1>

      {movies.length === 0 ? (
        <div className="no-results">
  <h2>🎬 No movies found</h2>
  <p>Try searching with a different movie name.</p>
</div>
      ) : (
        <>
          <MovieGrid movies={movies} />

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </main>
  )
}

export default SearchResults