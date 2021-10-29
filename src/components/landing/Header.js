import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { NavbarToggler, Collapse, Progress } from 'reactstrap'
import { ReactComponent as WhiteLogo } from 'assets/icons/main/whiteLogo.svg'

const header = [{
  title: "소개",
  to: "hero"
}, {
  title: "혜택",
  to: "benefit0"
}, {
  title: "기능",
  to: "feature"
}, {
  title: "러닝로그",
  to: "learninglog"
}, {
  title: "요금",
  to: "pricing"
}, {
  title: "다운로드",
  to: "download"
}];

export default function Header(props) {
  const [scroll, setScroll] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [scrolled, setScrolled] = useState(0);
  const toggleNav = () => setToggle(!toggle);
  const onScroll = () => {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    setScrolled((winScroll / height) * 100);

    if (window.scrollY > 52) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  }

  const onSignInClick = (e) => {
    props.onSignInClick(e);
    setClicked(true);
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, []);

  return (
    <header id="header" className="header">
      <nav className={"navbar fixed-top navbar-expand-md navbar-light bg-tra hover-menu " + (scroll ? "scroll" : "")}>
        <Progress value={scrolled} style={{ position: 'absolute', top: '0', width: '100%', height: '6px', 'padding': '-4px 0px' }} />
        <div className="container">
          <Link to="/" className="navbar-brand logo-black">
            <WhiteLogo width={100} height={64} fill='white' />

          </Link>

          <NavbarToggler
            type="button"
            onClick={toggleNav}
          >
            <span className="navbar-bar-icon" style={{ color: '#fff' }}><i className="fas fa-bars"></i></span>
          </NavbarToggler>

          <Collapse isOpen={toggle} navbar id="navbarSupportedContent" >
            <ul className="navbar-nav ml-auto">
              {header.map((v) =>
                <li key={v.title} className="nav-item dropdown">
                  <Link className="btn btn-light" spy={true} smooth={true} to={v.to}>
                    {v.title}
                  </Link>
                </li>)}
            </ul>
            <span className="nav-item navbar-text ">
              <button className="btn btn-light waves-effect mr-2" onClick={onSignInClick} disabled={clicked}>
                {clicked && <span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>}
                로그인
              </button>
            </span>
          </Collapse>
        </div>
      </nav>
    </header>
  );
}