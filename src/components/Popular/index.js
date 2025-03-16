import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import Contact from '../Contact'
import MoviesCard from '../MoviesCard'
import Loader from '../Loader'
import FailureView from '../FailureView'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Popular extends Component {
  state = {apiStatus: apiConstants.initial, popularMoviesList: []}

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const popularMovieApiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const popularMoviesResponse = await fetch(popularMovieApiUrl, options)
    if (popularMoviesResponse.ok) {
      const data = await popularMoviesResponse.json()
      const updatedData = data.results.map(eachMovie => ({
        id: eachMovie.id,
        backdropPath: eachMovie.backdrop_path,
        title: eachMovie.title,
        posterPath: eachMovie.poster_path,
      }))
      this.setState({
        popularMoviesList: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  popularMovieData = () => {
    const {popularMoviesList} = this.state
    return (
      <div className="popular-movies-container">
        <ul className="popular-movies-list-container">
          {popularMoviesList.map(eachMovie => (
            <MoviesCard movieDetails={eachMovie} key={eachMovie.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderPopularData = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiConstants.inProgress:
        return (
          <div className="popular-top-data-loader">
            <Loader />
          </div>
        )
      case apiConstants.success:
        return this.popularMovieData()
      default:
        return (
          <div className="popular-top-data-loader">
            <FailureView retry={this.getPopularMovies} />
          </div>
        )
    }
  }

  render() {
    return (
      <div className="popular-main-container">
        <Header activeTab="Popular" />
        <div className="popular-all-content-container">
          {this.renderPopularData()}
        </div>
        <Contact />
      </div>
    )
  }
}

export default Popular
