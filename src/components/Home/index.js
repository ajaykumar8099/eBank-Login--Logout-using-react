import {Redirect, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Home = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/ebank/login" />
  }
  const onRemove = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }

  return (
    <div className="home-container">
      <div className="top-container">
        <nav className="nav-bar-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
            className="nav-img"
          />
          <button type="button" className="logout-button" onClick={onRemove}>
            Logout
          </button>
        </nav>
      </div>
      <div className="card-container">
        <h1 className="your-head">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="card-image"
        />
      </div>
    </div>
  )
}
export default withRouter(Home)
