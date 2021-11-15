import React from "react";
import { Link } from "react-router-dom";
import User from "../img/user.svg";
// import Logo from "../img/logo.png";
import "../App.css";

export default function Header() {
  return (
    <header>
      <nav>
          <a href="/">
            <div className="logo">
              {/* <img src={Logo} alt="logo"></img> */}

              <h1>Prompt me</h1>
              <p>Fiction Ideas Repository</p>
            </div>
          </a>
        <ul className="list">
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/add">ADD</Link>
          </li>
          <li>
            <Link to="/categories">CATEGORIES</Link>
          </li>
        </ul>
      </nav>
          <div className="avatar">
            <Link to="/profile">
                <img src={User} alt="user avatar"></img>
            </Link>
          </div>
    </header>
  );
}
  


