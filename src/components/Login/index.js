import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    apiStatus: true,
    username: 'rahul',
    password: 'rahul@2021',
    errorMsg: '',
  }

  handleUsername = event => {
    this.setState({username: event.target.value})
  }

  handlePassword = event => {
    this.setState({password: event.target.value})
  }

  successResponse = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  handleSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.successResponse(data.jwt_token)
    } else {
      this.setState({errorMsg: data.error_msg, apiStatus: false})
    }
  }

  render() {
    const {password, apiStatus, username, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <img
          className="login-logo"
          src="https://res.cloudinary.com/dxauytfko/image/upload/v1740853905/Group_7399_dzmcmo.png"
          alt="login website logo"
        />
        <div className="login-form-container">
          <h1 className="login-heading">Login</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="login-label-input-container">
              <label className="login-label" htmlFor="username">
                USERNAME
              </label>
              <input
                className="login-input"
                type="text"
                id="username"
                placeholder="username"
                value={username}
                onChange={this.handleUsername}
              />
            </div>
            <div className="login-label-input-container">
              <label className="login-label" htmlFor="password">
                PASSWORD
              </label>
              <input
                className="login-input"
                type="password"
                id="password"
                placeholder="password"
                value={password}
                onChange={this.handlePassword}
              />
            </div>
            {!apiStatus && <p className="error-smg">{errorMsg}</p>}
            <div className="login-label-input-container">
              <button className="login-button login-button-sm" type="submit">
                Sign in
              </button>
              <button className="login-button login-button-lg" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
