import {Link} from 'react-router-dom'
import './index.css'

const MovieItem = props => {
  const {movieData} = props
  const {id, title, posterPath} = movieData

  return (
    <li className="movie-item">
      <Link to={`/movies/${id}`} target="_parent">
        <img src={posterPath} alt={title} className="movie-item-image" />
      </Link>
    </li>
  )
}

export default MovieItem
