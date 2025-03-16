import {withRouter, Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {IoMdCloseCircle} from 'react-icons/io'
import {IoReorderThreeSharp} from 'react-icons/io5'
import {Component} from 'react'

import './index.css'

class Navbar extends Component {
  state = {showMenu: false, activeTab: '', inputSearch: ''}

  componentDidMount() {
    const {activeTab} = this.props
    this.setState({activeTab})
  }

  handleMenu = () => {
    this.setState(prevState => ({
      showMenu: !prevState.showMenu,
    }))
  }

  handleCloseMenu = () => {
    this.setState({showMenu: false})
  }

  handleSearchInput = event => {
    this.setState({inputSearch: event.target.value})
  }

  handleSearchData = () => {
    const {inputSearch} = this.state
    const {searchFunc, activeTab} = this.props
    console.log(activeTab)
    searchFunc(inputSearch)
  }

  render() {
    const {showMenu, activeTab, inputSearch} = this.state
    const activeTabHome = activeTab === 'Home' ? 'active-tab-styles' : null
    const activeTabPopular =
      activeTab === 'Popular' ? 'active-tab-styles' : null
    const activeTabAccount =
      activeTab === 'Account' ? 'active-tab-styles' : null
    return (
      <div className="nav-container">
        <div className="nav-content-container">
          <div className="nav-lg-main-menu-container">
            <Link to="/">
              <img
                className="nav-logo"
                src="https://res.cloudinary.com/dxauytfko/image/upload/v1740853905/Group_7399_dzmcmo.png"
                alt="website logo"
              />
            </Link>
            <div className="nav-lg-menu-container">
              <ul className="lg-menu-container">
                <Link to="/" className="nav-menu-item">
                  <li className={activeTabHome}>Home</li>
                </Link>
                <Link to="/popular" className="nav-menu-item">
                  <li className={activeTabPopular}>Popular</li>
                </Link>
              </ul>
            </div>
          </div>
          <div className="lg-search-profile-container">
            {activeTab === 'Search' ? (
              <div className="search-input-container" data-testid="searchbox">
                <input
                  className="search-input-box"
                  type="search"
                  value={inputSearch}
                  placeholder="Search"
                  onChange={this.handleSearchInput}
                />
                <button
                  className="search-input-box-search-icon"
                  data-testid="searchButton"
                  type="button"
                  onClick={this.handleSearchData}
                >
                  <HiOutlineSearch size="20" />
                </button>
              </div>
            ) : (
              <Link to="/search">
                <button
                  onClick={this.handleSearchTab}
                  className="search-icon"
                  type="button"
                >
                  <HiOutlineSearch size="20" />
                </button>
              </Link>
            )}
            <button
              className="nav-show-hide-menu"
              onClick={this.handleMenu}
              type="button"
            >
              <IoReorderThreeSharp size="20" />
            </button>
            <Link to="/account">
              <img
                className="nav-lg-menu-container"
                src="https://res.cloudinary.com/dxauytfko/image/upload/v1740853564/Avatar_aqh9fz.png"
                alt="profile"
                width="40"
              />
            </Link>
          </div>
        </div>
        {showMenu && (
          <div className="nav-menu-container">
            <ul className="nav-menu-item-container">
              <Link to="/" className="nav-menu-item">
                <li className={activeTabHome}>Home</li>
              </Link>
              <Link to="/popular" className="nav-menu-item">
                <li className={activeTabPopular}>Popular</li>
              </Link>
              <Link to="/account" className="nav-menu-item">
                <li className={activeTabAccount}>Account</li>
              </Link>
            </ul>
            <button
              className="close-btn"
              onClick={this.handleCloseMenu}
              data-testid="closeButton"
              type="button"
            >
              <IoMdCloseCircle size="20" />
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Navbar)
