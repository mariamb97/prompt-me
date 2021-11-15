import React from "react";
import { Link } from "react-router-dom";
import User from "../img/user.svg";
import Logo from "../img/logo.png";
import "../App.css";

export default function Header() {
  return (
    <header>
      <nav>
        <div className="logo">
          <a href="/">
            {/* <img src={Logo} alt="logo"></img> */}

            <h1>Prompt me</h1>
            <p>Fiction Ideas Repository</p>
          </a>
        </div>
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
          <img src={User} alt="user avatar"></img><p>My profile</p>
        </Link>
      </div>
    </header>
  );
}
  


