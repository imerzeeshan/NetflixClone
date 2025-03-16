import {NavLink} from 'react-router-dom'
import './index.css'

const MoviesCard = props => {
  const {movieDetails} = props

  return (
    <NavLink to={`/movies/${movieDetails.id}`} target="_parent">
      <li className="movies-card-item">
        <img
          className="movies-card-img"
          src={movieDetails.posterPath}
          alt={movieDetails.title}
        />
      </li>
    </NavLink>
  )
}

export default MoviesCard
