import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
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
        <h1>Home</h1>
        {/* <Nav /> */}
      </header>
    </div>
  );
}
