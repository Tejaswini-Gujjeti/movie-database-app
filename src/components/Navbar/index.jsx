import {useState} from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import './index.css'

function Navbar() {
  const [searchInput, setSearchInput] = useState('')
  const navigate = useNavigate()

  const handleSearch = event => {
    event.preventDefault()

    if (searchInput.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(searchInput.trim())}`)
      setSearchInput('')
    }
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        MovieDB
      </Link>

      <div className="nav-links">
  <NavLink
    to="/"
    className={({isActive}) => (isActive ? 'active' : '')}
  >
    Home
  </NavLink>

  <NavLink
    to="/top-rated"
    className={({isActive}) => (isActive ? 'active' : '')}
  >
    Top Rated
  </NavLink>

  <NavLink
    to="/upcoming"
    className={({isActive}) => (isActive ? 'active' : '')}
  >
    Upcoming
  </NavLink>
</div>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Search movies..."
          value={searchInput}
          onChange={event => setSearchInput(event.target.value)}
        />

        <button type="submit">Search</button>
      </form>
    </nav>
  )
}

export default Navbar