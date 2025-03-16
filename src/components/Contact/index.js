import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Contact = () => (
  <footer className="footer-main-container">
    <div className="footer-icons-container">
      <FaGoogle size="20" />
      <FaTwitter size="20" />
      <FaInstagram size="20" />
      <FaYoutube size="20" />
    </div>
    <p className="footer-text">Contact us</p>
  </footer>
)

export default Contact
