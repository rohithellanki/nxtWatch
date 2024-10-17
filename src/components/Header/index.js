import Cookies from 'js-cookie'

import {withRouter} from 'react-router-dom'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <div className="logout-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
          className="profile-logo"
        />
        <button className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>

      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        alt="website logo"
      />
      <h1 className="sub-heading">
        Buy Nxt Watch Premium prepaid plans with UPI
      </h1>
      <button className="get-btn">GET IT NOW</button>
    </div>
  )
}
export default withRouter(Header)
