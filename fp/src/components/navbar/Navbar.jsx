import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../logo.svg";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [activeLink, setActiveLink] = useState(1);

  const handleLinkClick = (linkId) => {
    setActiveLink(linkId);
  };

  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="gpt3__navbar-links_container">
          <p>
            <Link
              to={"/"}
              className={activeLink === 1 ? "active" : ""}
              onClick={() => handleLinkClick(1)}
            >
              {" "}
              <a>Home</a>
            </Link>
          </p>
          <p>
            <Link
              to={"/about"}
              className={activeLink === 2 ? "active" : ""}
              onClick={() => handleLinkClick(2)}
            >
              {" "}
              <a>About us?</a>
            </Link>
          </p>
          <p>
            <Link
              to={"/find"}
              className={activeLink === 3 ? "active" : ""}
              onClick={() => handleLinkClick(3)}
            >
              Find People
            </Link>
          </p>
          <p>
            <Link
              to={"/announcement"}
              className={activeLink === 4 ? "active" : ""}
              onClick={() => handleLinkClick(4)}
            >
              Announcement
            </Link>
          </p>
          <p>
            <Link
              to={"/feed"}
              className={activeLink === 5 ? "active" : ""}
              onClick={() => handleLinkClick(5)}
            >
              Feeds
            </Link>
          </p>
        </div>
      </div>
      <div className="gpt3__navbar-sign">
        <Link to={"/contact"}>
          <button type="button">Contact us</button>
        </Link>
      </div>
      <div className="gpt3__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="gpt3__navbar-menu_container scale-up-center">
            <div className="gpt3__navbar-menu_container-links">
              <p>
                <Link to={"/"} onClick={() => handleLinkClick(1)}>
                  <a>Home</a>
                </Link>
              </p>
              <p>
                <Link
                  to={"/about"}
                  className={activeLink === 2 ? "active" : ""}
                  onClick={() => handleLinkClick(2)}
                >
                  <a>About us?</a>
                </Link>
              </p>
              <p>
                <Link
                  to={"/find"}
                  className={activeLink === 3 ? "active" : ""}
                  onClick={() => handleLinkClick(3)}
                >
                  <a>Find People</a>
                </Link>
              </p>

              <p>
                <Link
                  to={"/announcement"}
                  className={activeLink === 5 ? "active" : ""}
                  onClick={() => handleLinkClick(5)}
                >
                  Announcement
                </Link>
              </p>
            </div>
            <div className="gpt3__navbar-menu_container-links-sign">
              <Link to={"/contact"}>
                <button type="button">Contact us</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
