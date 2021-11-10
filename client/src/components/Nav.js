import React from "react";
import { Link } from "react-router-dom";

import "../App.css";

export default function Nav() {
return (
    <nav>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/register">Register</Link>
        </li>
        <li>
            <Link to="/add">Add Prompt</Link>
        </li>
        <li>
            <Link to="/user">User</Link>
        </li>
        <li>
            <Link to="/addcategory">Add Category</Link>
        </li>
    </nav>
)}
