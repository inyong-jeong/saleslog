import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * Renders the Footer
 */
class Footer extends Component {

    render() {
        return (
            <footer className="footer footer-alt text-center" style={{padding: '19px 15px 20px'}}>
                <Link to="https://theklab.co" className="text-secondary">
            2020 &copy; TheKlab.co
          </Link>
          <span> | </span>
          <Link to="https://theklab.co/privacy" className="text-secondary">
            개인정보처리방침
          </Link>
          <span> | </span>
          <Link to="https://theklab.co/policy" className="text-secondary">
            이용약관
          </Link>
            </footer>
        )
    }
}

export default Footer;