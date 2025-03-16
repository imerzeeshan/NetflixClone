import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import Contact from '../Contact'
import ReactSlider from '../ReactSlider'
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

class Home extends Component {
  state = {
    trendingApiStatus: apiConstants.initial,
    topRatedApiStatus: apiConstants.initial,
    originalsApiStatus: apiConstants.initial,
    trendingList: [],
    topRatedMoviesList: [],
    originalsList: [],
  }

  jwtToken = Cookies.get('jwt_token')

  options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${this.jwtToken}`,
    },
  }

  componentDidMount() {
    this.getTrending()
    this.getTopRated()
    this.getOriginals()
  }

  updateDataIntoFrontend = data =>
    data.map(eachMovie => ({
      backdropPath: eachMovie.backdrop_path,
      id: eachMovie.id,
      overview: eachMovie.overview,
      posterPath: eachMovie.poster_path,
      title: eachMovie.title,
    }))

  getTrending = async () => {
    this.setState({
      trendingApiStatus: apiConstants.inProgress,
    })
    const trendingAPIUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const trendingResponse = await fetch(trendingAPIUrl, this.options)
    if (trendingResponse.ok) {
      const trendingData = await trendingResponse.json()
      const updatedTrendingData = this.updateDataIntoFrontend(
        trendingData.results,
      )

      this.setState({
        trendingList: updatedTrendingData,
        trendingApiStatus: apiConstants.success,
      })
    } else {
      this.setState({
        trendingApiStatus: apiConstants.failure,
      })
    }
  }

  getTopRated = async () => {
    this.setState({
      topRatedApiStatus: apiConstants.inProgress,
    })
    const topRatedMoviesApiUrl =
      'https://apis.ccbp.in/movies-app/top-rated-movies'
    const topRatedMoviesResponse = await fetch(
      topRatedMoviesApiUrl,
      this.options,
    )
    if (topRatedMoviesResponse.ok) {
      const topRatedData = await topRatedMoviesResponse.json()
      const updatedTopRatedMoviesData = this.updateDataIntoFrontend(
        topRatedData.results,
      )
      this.setState({
        topRatedMoviesList: updatedTopRatedMoviesData,
        topRatedApiStatus: apiConstants.success,
      })
    } else {
      this.setState({
        topRatedApiStatus: apiConstants.failure,
      })
    }
  }

  getOriginals = async () => {
    this.setState({
      originalsApiStatus: apiConstants.inProgress,
    })
    const originalsApiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const originalsResponse = await fetch(originalsApiUrl, this.options)
    if (originalsResponse.ok) {
      const originalsData = await originalsResponse.json()
      const updatedOriginalsDate = this.updateDataIntoFrontend(
        originalsData.results,
      )

      this.setState({
        originalsList: updatedOriginalsDate,
        originalsApiStatus: apiConstants.success,
      })
    } else {
      this.setState({
        originalsApiStatus: apiConstants.failure,
      })
    }
  }

  getHomeDisplayData = () => {
    const {originalsList, originalsApiStatus} = this.state

    const len = originalsList.length
    const index = Math.floor(Math.random() * len)
    const displayData = originalsList[index]

    switch (originalsApiStatus) {
      case apiConstants.inProgress:
        return (
          <div className="home-top-data-loader">
            <Loader />
          </div>
        )
      case apiConstants.success:
        return (
          <HomeBGContainer
            bgSmallIMG={displayData.posterPath}
            bgBigIMG={displayData.backdropPath}
          >
            <div className="home-random-data">
              <h1 className="home-main-heading">{displayData.title}</h1>
              <p className="home-main-para">{displayData.overview}</p>
              <button className="home-play-btn" type="button">
                Play
              </button>
            </div>
          </HomeBGContainer>
        )
      default:
        return (
          <div className="home-top-data-loader">
            <FailureView retry={this.getOriginals} />
          </div>
        )
    }
  }

  getTrendingData = () => {
    const {trendingApiStatus, trendingList} = this.state

    switch (trendingApiStatus) {
      case apiConstants.inProgress:
        return (
          <div className="slider-loader-container">
            <Loader />
          </div>
        )
      case apiConstants.success:
        return <ReactSlider moviesList={trendingList} />
      default:
        return (
          <div className="slider-loader-container">
            <FailureView retry={this.getOriginals} />
          </div>
        )
    }
  }

  getTopRatedData = () => {
    const {topRatedApiStatus, topRatedMoviesList} = this.state

    switch (topRatedApiStatus) {
      case apiConstants.inProgress:
        return (
          <div className="slider-loader-container">
            <Loader />
          </div>
        )
      case apiConstants.success:
        return <ReactSlider moviesList={topRatedMoviesList} />
      default:
        return (
          <div className="slider-loader-container">
            <FailureView retry={this.getOriginals} />
          </div>
        )
    }
  }

  getOriginalsData = () => {
    const {originalsApiStatus, originalsList} = this.state

    switch (originalsApiStatus) {
      case apiConstants.inProgress:
        return (
          <div className="slider-loader-container">
            <Loader />
          </div>
        )
      case apiConstants.success:
        return <ReactSlider moviesList={originalsList} />
      default:
        return (
          <div className="slider-loader-container">
            <FailureView retry={this.getOriginals} />
          </div>
        )
    }
  }

  renderJsx = () => (
    <div className="home-main-container">
      <Header activeTab="Home" />
      {this.getHomeDisplayData()}
      <div className="home-slider-container">
        <h1 className="trending">Trending Now</h1>
        {this.getTrendingData()}
      </div>
      <div className="home-slider-container">
        <h1 className="trending">Popular</h1>
        {this.getTopRatedData()}
      </div>
      <div className="home-slider-container">
        <h1 className="trending">Originals</h1>
        {this.getOriginalsData()}
      </div>
      <Contact />
    </div>
  )

  render() {
    return <>{this.renderJsx()}</>
  }
}

export default Home
