import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXTwitter,
  faInstagram,
  faWhatsapp,
  faFacebookF,
  faSlack,
  faTelegram
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-links">
            <a href="/terms">Terms of Service</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
          <div className="footer-social">
            <a href="mailto:contact@gptvetting.com" aria-label="Email">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
            <a href="https://twitter.com/gptvetting" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
            <a href="https://www.instagram.com/gptvetting" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://wa.me/+254733949120" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
            <a href="https://www.facebook.com/gptvetting" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://slack.com/gptvetting" target="_blank" rel="noopener noreferrer" aria-label="Slack">
              <FontAwesomeIcon icon={faSlack} />
            </a>
            <a href="https://t.me/gptvetting" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              <FontAwesomeIcon icon={faTelegram} />
            </a>
          </div>
        </div>
        <div className="footer-copyright">
          <p>&copy; 2024 GPT Vetting. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;