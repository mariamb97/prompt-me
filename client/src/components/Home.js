import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function Home() {
  let [ prompts, setPrompts ] = useState( [] );
  let [categories, setCategories] = useState([]);
  let [ error, setError ] = useState( null );

  useEffect(() => {
    getPrompts();
    getCategories();
  }, []);

  const getPrompts = async () => {
    try {
      const res = await fetch("/prompts", {});
      const prompts = await res.json();
      setPrompts( prompts );
      console.log(prompts);
    } catch (err) {
      console.log(err);
      setError(error);
    }
  };

    const getCategories = async () => {
      try {
        const res = await fetch("/categories", {});
        const categories = await res.json();
        setCategories(categories);
        console.log(categories);
      } catch (err) {
        console.log(err);
        setError(error);
      }
    };
  
  const handleFilter = (category) => {
    setPrompts("hola");
    addFilter(category);
  }

  const addFilter = ( category ) => {
    const filter = prompts.filter(
      (prompt) => prompt.category_id === category.category_id
    );
    console.log(filter);
    setPrompts(filter);
    
  }

  return (
    <section id="home">
      <h1>Take your prompt!</h1>
      <div id="categories_nav">
        <ul>
          <li><button>All</button></li>
          {categories &&
            categories.filter((category, i) => i<5).map((category, i) => (
              <li key={i}>
                <button onClick={() => handleFilter(category)}>{category.category_name}</button>
              </li>
            ))}
        </ul>
        <div>
          <Link to="/category/add">Add Category</Link>
        </div>
      </div>

      {prompts &&
        prompts.map((e, index) => (
          <article key={index}>
            <p>#{index + 1}</p>
            <p>{e.prompt_description}</p>
            <div>
              <p>Requirements:</p>
              {e.prompt_requirements &&
                e.prompt_requirements
                  .split("|")
                  .map((e, i) => <p key={i}>{e}</p>)}
            </div>
            <div>
              <p>Links:</p>
              {e.prompt_links &&
                e.prompt_links.split("|").map((e, i) => <p key={i}>{e}</p>)}
            </div>
            <p>Author: {e.user_nickname}</p>
            <p>Categories ID: {e.category_name}</p>
          </article>
        ))}
    </section>
  );
}
