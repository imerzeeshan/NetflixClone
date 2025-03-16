import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import Contact from '../Contact'
import MoviesCard from '../MoviesCard'
import Loader from '../Loader'
import FailureView from '../FailureView'

import {HomeBGContainer} from './styledComponents'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class MovieDetails extends Component {
  state = {apiStatus: apiConstants.initial, movieDetails: {}, similarMovies: []}

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const movieDetails = data.movie_details
      const updatedMovieDetails = {
        adult: movieDetails.adult,
        backdropPath: movieDetails.backdrop_path,
        budget: movieDetails.budget,
        id: movieDetails.id,
        overview: movieDetails.overview,
        posterPath: movieDetails.poster_path,
        releaseDate: movieDetails.release_date,
        runtime: movieDetails.runtime,
        title: movieDetails.title,
        voteAverage: movieDetails.vote_average,
        voteCount: movieDetails.vote_count,
        genres: movieDetails.genres.map(eachGenre => ({
          id: eachGenre.id,
          name: eachGenre.name,
        })),
        similarMovies: movieDetails.similar_movies.map(eachMovie => ({
          backdropPath: eachMovie.backdrop_path,
          id: eachMovie.id,
          posterPath: eachMovie.poster_path,
          title: eachMovie.title,
        })),
        spokenLanguages: movieDetails.spoken_languages.map(eachLang => ({
          languageName: eachLang.english_name,
          id: eachLang.id,
        })),
      }
      this.setState({
        movieDetails: updatedMovieDetails,
        similarMovies: updatedMovieDetails.similarMovies.slice(0, 6),
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  // getReleaseDate = date => {
  //   const months = [
  //     'January',
  //     'Fabruary',
  //     'March',
  //     'April',
  //     'May',
  //     'June',
  //     'July',
  //     'August',
  //     'September',
  //     'October',
  //     'November',
  //     'December',
  //   ]
  //   const newDate = new Date(date)
  //   const year = newDate.getFullYear()
  //   const month = months[newDate.getMonth()]
  //   const day = newDate.getDay().toString()

  //   let dayEndsWord
  //   if (day.endsWith('1')) {
  //     dayEndsWord = 'st'
  //   } else if (day.endsWith('2')) {
  //     dayEndsWord = 'nd'
  //   } else if (day.endsWith('3')) {
  //     dayEndsWord = 'rd'
  //   } else {
  //     dayEndsWord = 'th'
  //   }

  //   return (
  //     <p>
  //       <span>
  //         {day}
  //         {dayEndsWord}
  //       </span>
  //       <span> {month}</span>
  //       <span> {year}</span>
  //     </p>
  //   )
  // }

  movieDetailsJSX = () => {
    const {movieDetails, similarMovies} = this.state
    const date = new Date(movieDetails.releaseDate)

    const months = [
      'January',
      'Fabruary',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const newDate = new Date(date)
    const year = newDate.getFullYear()
    const month = months[newDate.getMonth()]
    const day = newDate.getDay().toString()

    let dayEndsWord
    if (day.endsWith('1')) {
      dayEndsWord = 'st'
    } else if (day.endsWith('2')) {
      dayEndsWord = 'nd'
    } else if (day.endsWith('3')) {
      dayEndsWord = 'rd'
    } else {
      dayEndsWord = 'th'
    }

    return (
      <div>
        <HomeBGContainer
          className="movie-details-container"
          bgSmallIMG={movieDetails.posterPath}
          bgBigIMG={movieDetails.backdropPath}
        >
          <h1 className="movie-details-main-heading">{movieDetails.title}</h1>
          <div className="movie-details-duration-and-year">
            <p className="movie-details-hours-and-year">
              {`${Math.floor(movieDetails.runtime / 60)}h 
              ${movieDetails.runtime % 60}m`}
            </p>
            <p className="movie-details-sensor-certificate">
              {movieDetails.adult ? 'A' : 'U/A'}
            </p>
            <p className="movie-details-hours-and-year"> {year} </p>
          </div>
          <p className="movie-details-description">{movieDetails.overview}</p>
          <button className="movie-details-play-btn" type="button">
            Play
          </button>
        </HomeBGContainer>
        <div className="movie-details-items-container">
          <div className="movie-details-genres-container">
            <h1 className="movie-details-headings">Genres</h1>
            <ul className="movie-details-ul-container">
              {movieDetails.genres.map(eachGenre => (
                <li key={eachGenre.id}>
                  <p className="movie-details-headings-items">
                    {eachGenre.name}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="movie-details-genres-container">
            <h1 className="movie-details-headings">Audio Available</h1>
            <ul className="movie-details-ul-container">
              {movieDetails.spokenLanguages.map(eachLang => (
                <li key={eachLang.id}>
                  <p className="movie-details-headings-items">
                    {eachLang.languageName}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="movie-details-genres-container">
            <div>
              <h1 className="movie-details-headings">Rating Count</h1>
              <p className="movie-details-headings-items">
                {movieDetails.voteCount}
              </p>
            </div>
            <div>
              <h1 className="movie-details-headings">Rating Average</h1>
              <p className="movie-details-headings-items">
                {movieDetails.voteAverage}
              </p>
            </div>
          </div>
          <div className="movie-details-genres-container">
            <div>
              <h1 className="movie-details-headings">Budget</h1>
              <p className="movie-details-headings-items">
                {movieDetails.budget}
              </p>
            </div>
            <div>
              <h1 className="movie-details-headings">Release Date</h1>
              <p className="movie-details-headings-items">
                {day}
                {dayEndsWord} {month} {year}
              </p>
            </div>
          </div>
        </div>
        <div className="movie-details-similar-movie-main-container">
          <h1 className="movie-details-similar-movies">More like this</h1>
          <ul className="movie-details-similar-movies-container">
            {similarMovies.map(eachMovie => (
              <MoviesCard movieDetails={eachMovie} key={eachMovie.id} />
            ))}
          </ul>
        </div>
        <Contact />
      </div>
    )
  }

  renderMovieDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.inProgress:
        return (
          <div className="movie-details-slider-loader-container">
            <Loader />
          </div>
        )
      case apiConstants.success:
        return this.movieDetailsJSX()
      default:
        return (
          <div className="movie-details-slider-loader-container">
            <FailureView retry={this.getMovieDetails} />
          </div>
        )
    }
  }

  render() {
    return (
      <div className="movie-details-main-container">
        <Header />
        <div className="movie-details-render-container">
          {this.renderMovieDetails()}
        </div>
      </div>
    )
  }
}

export default MovieDetails
