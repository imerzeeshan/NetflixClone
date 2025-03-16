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

class Search extends Component {
  state = {
    apiStatus: apiConstants.initial,
    searchDataList: [],
    userSearchInput: '',
    activeTab: 'Search',
  }

  getSearchData = async searchInput => {
    this.setState({apiStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.results.map(eachSearch => ({
        backdropPath: eachSearch.backdrop_path,
        id: eachSearch.id,
        posterPath: eachSearch.poster_path,
        title: eachSearch.title,
      }))
      this.setState({
        searchDataList: updatedData,
        apiStatus: apiConstants.success,
        userSearchInput: searchInput,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderSearchResult = () => {
    const {searchDataList, apiStatus, userSearchInput} = this.state
    return (
      <div className="search-data-container">
        {apiStatus && searchDataList.length === 0 ? (
          <div className="search-no-results">
            <img
              className="search-zero-image"
              src="https://res.cloudinary.com/dxauytfko/image/upload/v1740853565/Group_7394_pmwqtm.png"
              alt="no movies"
            />
            <p>Your search for {userSearchInput} did not find any matches.</p>
          </div>
        ) : (
          <ul className="search-item-list-container">
            {searchDataList.map(eachMovie => (
              <MoviesCard key={eachMovie.id} movieDetails={eachMovie} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderSuccessView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.inProgress:
        return (
          <div className="search-loader-container">
            <Loader />
          </div>
        )
      case apiConstants.success:
        return this.renderSearchResult()
      default:
        return (
          <div className="search-loader-container">
            <FailureView retry={this.getSearchData} />
          </div>
        )
    }
  }

  render() {
    const {activeTab} = this.state
    return (
      <div className="search-main-container">
        <Header searchFunc={this.getSearchData} activeTab={activeTab} />
        {this.renderSuccessView()}
        <Contact />
      </div>
    )
  }
}

export default Search
