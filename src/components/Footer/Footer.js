import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Footer.css';
import facebookIcon from '../../images/facebook-icon.svg';
import githubIcon from '../../images/github-icon.svg';

function Footer({ isHome, homeRef }) {
  const navigate = useNavigate();
  const handleHomeClick = (event) => {
    event.preventDefault();
    if (isHome) {
      homeRef.current.scrollIntoView({
        behavior: 'smooth',
      });
      return;
    }
    navigate('/');
  };
  return (
    <footer className="footer">
      <p className="footer__copyrights">&copy; 2021 Supersite, Powered by News API</p>
      <nav className="footer__navigation">
        <div className="footer__links">
          <a className="footer__link" href="/" onClick={handleHomeClick}>
            Home
          </a>
          <a
            className="footer__link"
            href="https://practicum.yandex.com"
            target="_blank"
            rel="noreferrer"
          >
            Practicum by Yandex
          </a>
        </div>
        <div className="footer__icons">
          <a
            className="footer__icon-link"
            href="https://github.com/yaniv10501"
            target="_blank"
            rel="noreferrer"
          >
            <img className="footer__icon" src={githubIcon} alt="GitHub icon" />
          </a>
          <a
            className="footer__icon-link"
            href="https://github.com/yaniv10501"
            target="_blank"
            rel="noreferrer"
          >
            <img className="footer__icon" src={facebookIcon} alt="Facebook icon" />
          </a>
        </div>
      </nav>
    </footer>
  );
}

Footer.propTypes = {
  isHome: PropTypes.bool.isRequired,
  homeRef: PropTypes.instanceOf(Object).isRequired,
};

export default Footer;
