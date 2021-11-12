import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Prompt from "./Prompt";


export default function Home() {
  let [ prompts, setPrompts ] = useState( [] );
  let [categories, setCategories] = useState([]);
  let [ error, setError ] = useState( null );
  let [ filter, setFilter ] = useState( [] );

  useEffect(() => {
    getPrompts();
    getCategories();
  }, []);

  const getPrompts = async () => {
    try {
      const res = await fetch("/prompts", {});
      const prompts = await res.json();
      setPrompts( prompts );
      setFilter( prompts );
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
      } catch (err) {
        console.log(err);
        setError(error);
      }
    };
  
  const handleFilter = ( category ) => {
    setError(null);
    setFilter(prompts);
    addFilter(category);
  }

  const handleFilterAll = () => {
    setError(null);
    setFilter( prompts );
  }

  const handleDelete = ( element ) => {
    setError(null);
    deletePrompt( element.prompt_id );
  }

  const addFilter = ( category ) => {
    const filter = prompts.filter(
      (prompt) => prompt.category_id === category.category_id
    );
    setFilter(filter); 
  }

  const deletePrompt = async ( id ) => {
    console.log( "hola", id )
    try {
      const res = await fetch(`/prompts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      } );

      const prompts = await res.json();

      setPrompts(prompts);
      setFilter( prompts );
      
    } catch ( err ) {
      console.log( err );
      setError(err)
    }
  }

  return (
    <section id="home">
      <h1>Take your prompt!</h1>
      <div id="categories_nav">
        <ul>
          <li>
            <button onClick={() => handleFilterAll()}>All</button>
          </li>
          {categories &&
            categories
              .filter((category, i) => i < 5)
              .map((category, i) => (
                <li key={i}>
                  <button onClick={() => handleFilter(category)}>
                    {category.category_name}
                  </button>
                </li>
              ))}
        </ul>
        <div>
          <Link to="/add">Add</Link>
        </div>
      </div>
      {error && <p>error</p>}
      {filter &&
        filter.map((prompt, index) => (
          <Prompt key={index} prompt={prompt} handleDelete={handleDelete} />
        ))}
    </section>
  );
}
