import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-main-container">
    <h1 className="not-found-main-heading">Lost Your Way ?</h1>
    <p className="not-found-description">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button className="not-found-button" type="button">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound
