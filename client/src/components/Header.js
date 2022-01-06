import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import User from "../img/user.svg";
// import Logo from "../img/logo.png";
import "../App.css";
import "./Header.css"


export default function Header({ onSuccess, isAuth, setUserCategories, setUserPrompts }) {

  const navigate = useNavigate()

  const logOut = async () => {
    localStorage.removeItem("token")
    onSuccess(false)
    setUserCategories([])
    setUserPrompts([])
    navigate("/authentication")
  }

  return (
    <header>
      {!isAuth ?
        <div className="logo">
          <h1>Prompt me</h1>
          <p>Fiction Ideas Repository</p>
        </div> :
        <div>
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
                <Link to="/" className="home-link">HOME</Link>
              </li>
              <li>
                <Link to="/add">ADD PROMPT</Link>
              </li>
              <li>
                <Link to="/categories">CATEGORIES</Link>
              </li>
              <li>
                <Link to="/public">PUBLIC PROMPTS</Link>
              </li>
            </ul>
          </nav>
          <div className="avatar">
            <Link to="/profile">
              <img src={User} alt="user avatar"></img>
            </Link>
            <button onClick={logOut} id="header-logout-button">Log Out</button>
          </div>
          <Outlet />
        </div>
      }
    </header>


  );
}



