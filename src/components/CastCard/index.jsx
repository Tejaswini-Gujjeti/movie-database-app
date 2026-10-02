import './index.css'

function CastCard({castMember}) {
  const {
    name,
    character,
    profile_path,
  } = castMember

  return (
    <div className="cast-card">
      {profile_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${profile_path}`}
          alt={name}
          className="cast-image"
        />
      ) : (
        <div className="no-cast-image">
          No Image
        </div>
      )}

      <h3>{name}</h3>

      <p>{character || 'Character unavailable'}</p>
    </div>
  )
}

export default CastCard