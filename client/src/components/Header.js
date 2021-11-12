import React from "react";
import { Link } from "react-router-dom";
import User from "../img/user.svg";
import Logo from "../img/logo.png";
import "../App.css";

export default function Header() {
  return (
    <header>
      <div id="logo">
        <a href="/">
          <img src={Logo} alt="logo"></img>
        </a>
      </div>
      <nav>
        <ul>
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
      <div id="avatar">
        <Link to="/profile">
          <img src={User} alt="user avatar"></img>
        </Link>
      </div>
    </header>
  );}
