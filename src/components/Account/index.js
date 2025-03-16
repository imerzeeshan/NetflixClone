import Cookies from 'js-cookie'
import Header from '../Header'
import Contact from '../Contact'

import './index.css'

const Account = props => {
  const clickLogout = () => {
    const {history} = props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }

  return (
    <div className="account-main-container">
      <Header activeTab="Account" />
      <div className="account-details-container">
        <h1 className="account-heading">Account</h1>
        <hr className="account-hr-line" />
        <div className="account-user-membership-details-container">
          <p className="account-membership">Member ship</p>
          <div className="account-user-details-container">
            <p className="account-gmail">imerzeeshan@gmail.com</p>
            <p className="account-password">Password: ************</p>
          </div>
        </div>
        <hr className="account-hr-line" />
        <div className="account-user-membership-details-container">
          <p className="account-membership">Plan details</p>
          <div className="account-user-plan-details-container">
            <p className="account-plan-details">Premium</p>
            <p className="account-plan-details account-plan-quality-details">
              Ultra HD
            </p>
          </div>
        </div>
        <hr className="account-hr-line" />
        <div className="account-button-container">
          <button
            className="account-logout-button"
            onClick={clickLogout}
            type="button"
          >
            Logout
          </button>
        </div>
      </div>
      <Contact />
    </div>
  )
}

export default Account
