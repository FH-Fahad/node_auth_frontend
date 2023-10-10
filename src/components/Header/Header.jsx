/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Header.Styles.css";
import Icon from "../../assets/Icon.svg";

import SingleButtonDropdown from "../Dropdown/Dropdown";

function Header() {
  const [isLogged, setIsLogged] = useState(false);
  const items = ["Logout"];
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (token) setIsLogged(!!token);
    //console.log("Logged In");
  }, [token]);

  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <img src={Icon} alt="logo" />
      </Link>

      <div className="options">
        {isLogged ? (
          <SingleButtonDropdown
            items={items}
            username={username}
            email={email}
            // onClick={checkToken}
          />
        ) : (
          <>
            {/* <Link className="option" to="/about">
              ABOUT
            </Link>
            <Link className="option" to="/contact">
              CONTACT
            </Link>
            <Link className="option" to="/login">
              LOGIN
            </Link> */}
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
