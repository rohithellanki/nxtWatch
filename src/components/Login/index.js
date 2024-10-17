import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onLoginSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onLoginFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    return (
      <div className="main-container">
        <form className="login-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="logo"
            className="login-logo"
          />
          <label className="label" htmlFor="user-input">
            UERNAME
          </label>
          <input
            type="text"
            className="input"
            placeholder="Username"
            onChange={this.onChangeUsername}
            id="user-input"
          />
          <label className="label" htmlFor="pass-input">
            PASSWORD
          </label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            onChange={this.onChangePassword}
            id="pass-input"
          />
          <div className="checkbox-container">
            <input type="checkbox" />
            <p>Show Password</p>
          </div>
          <button className="lgn-btn">Login</button>
          {showSubmitError ? <p className="error">*{errorMsg}</p> : ''}
        </form>
      </div>
    )
  }
}
export default Login
