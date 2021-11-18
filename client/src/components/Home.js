import React, { useEffect, useState } from "react";
import Prompt from "./Prompt";


export default function Home() {
  let [prompts, setPrompts] = useState([]);
  let [categories, setCategories] = useState([]);
  let [error, setError] = useState(null);
  let [filter, setFilter] = useState([]);

  useEffect(() => {
    getPrompts();
    getCategories();
  }, []);

  const getPrompts = async () => {
    try {
      const res = await fetch("/prompts", {});
      const prompts = await res.json();
      setPrompts(prompts);
      setFilter(prompts);
    } catch (err) {
      setError(error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await fetch("/categories", {});
      const categories = await res.json();
      setCategories(categories);
    } catch (err) {
      setError(error);
    }
  };

  const handleFilter = (category) => {
    setError(null);
    setFilter(prompts);
    addFilter(category);
  };

  const handleFilterAll = () => {
    setError(null);
    setFilter(prompts);
  };

  const handleDelete = (element) => {
    setError(null);
    deletePrompt(element.id);
  };

  const addFilter = (category) => {
    const filter = prompts.filter(
      (prompt) => prompt.category_id === category.id
    );
    setFilter(filter);
  };

  const deletePrompt = async (id) => {
    try {
      const res = await fetch(`/prompts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const prompts = await res.json();

      setPrompts(prompts);
      setFilter(prompts);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  return (
    <section className="main" id="home">
      <h3>Take your prompt!</h3>
      <p>Popular categories:</p>
      <div className="filters_nav">
        <ul>
          <li>
            <button onClick={() => handleFilterAll()}>All</button>
          </li>
          {categories &&
            categories
              // ??
              .filter((category, i) => i < 5)
              .map((category, i) => (
                <li key={i}>
                  <button onClick={() => handleFilter(category)}>
                    {category.name}
                  </button>
                </li>
              ))}
        </ul>
      </div>
      {error && <p>error</p>}
      {filter &&
        filter.map((prompt, index) => (
          <Prompt key={index} prompt={prompt} handleDelete={handleDelete} />
        ))}
    </section>
  );
}
