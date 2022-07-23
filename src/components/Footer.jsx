import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-link">
        <div className="footer-link-wrapper">
          <div className="footer-link-content">
            <h2>Sobre nosotros</h2>
            <Link to="/">Hola</Link>
            <Link to="/">Hola</Link>
            <Link to="/">Hola</Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div className="footer-link-content">
            <h2>Sobre nosotros</h2>
            <Link to="/">Hola</Link>
            <Link to="/">Hola</Link>
            <Link to="/">Hola</Link>
          </div>
        </div>
      </div>
      <div className="social-networks">
        <div className="social-networks-wrapper">
          <div className="social-networks-content">
            <Link
              className="social-network-logo"
              to="/"
              target="_blank"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </Link>
            <Link
              className="social-network-logo"
              to="/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </Link>
          </div>
          <small className="copyright">Copyright © Turismo 2022</small>
        </div>
      </div>
    </div>
  );
}

export default Footer;
