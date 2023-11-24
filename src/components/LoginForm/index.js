import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {userId: '', pin: '', submitFormError: false, errorMsg: ''}

  onFailure = errorMsg => {
    this.setState({errorMsg})
  }

  onSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePassword = event => {
    this.setState({pin: event.target.value})
  }

  onSubmit = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
      this.setState({submitFormError: true})
    }
  }

  render() {
    const {submitFormError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="container">
        <div className="sub-container">
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="logo-login-img"
            />
          </div>
          <form onSubmit={this.onSubmit} className="sub-two-container">
            <h1 className="head">Welcome Back!</h1>
            <label htmlFor="userId" className="label">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              placeholder="Enter User ID"
              onChange={this.onChangeUserId}
              className="input"
            />
            <label htmlFor="pin" className="label">
              PIN
            </label>
            <input
              type="password"
              id="pin"
              placeholder="Enter PIN"
              onChange={this.onChangePassword}
              className="input"
            />
            <button type="submit" className="button">
              Login
            </button>
            {submitFormError ? <p className="error-msg">{errorMsg}</p> : ''}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
