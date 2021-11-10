
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function User() {
  let [prompts, setPrompts] = useState([]);
  let [error, setError] = useState(null);

  useEffect(() => {
    getPrompts();
  }, []);

  const getPrompts = () => {
    fetch("/prompts")
      .then((response) => response.json())
      .then((prompts) => {
        setPrompts(prompts);
        console.log(prompts);
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <div>
      <header>
        <h1>User Section</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/add">Add Prompt</Link>
          <Link to="/user">User</Link>
          <Link to="/addcategory">Add Category</Link>
        </nav>
      </header>
    </div>
  );
}