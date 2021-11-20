import React, { useEffect, useState } from "react";
import Prompt from "./Prompt";


export default function Home({ userCategories }) {
  let [userPrompts, setUserPrompts] = useState([]);


  useEffect(() => {
    getUserPrompts();
  }, []);


  const getUserPrompts = async () => {
    try {
      const response = await fetch("/prompts/users", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const userPrompts = await response.json();
      if (!userPrompts.message) {
        setUserPrompts(userPrompts);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleFilterAll = () => {
    getUserPrompts();
  };


  const getFilteredPromptsByCategory = (category) => {

    fetch(`/prompts/users/?categories[]=${category.id}`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((prompts) => {
        setUserPrompts(prompts)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (element) => {
    deletePrompt(element.id);
  };

  const deletePrompt = async (id) => {
    try {
      const response = await fetch(`/prompts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const prompts = await response.json();

      setUserPrompts(prompts);
    } catch (error) {
      console.log(error);
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
          {userCategories &&
            userCategories
              .map((category, i) => (
                <li key={i}>
                  <button onClick={() => getFilteredPromptsByCategory(category)}>
                    {category.name}
                  </button>
                </li>
              ))}
        </ul>
      </div>
      {userPrompts &&
        userPrompts.map((prompt, index) => (
          <Prompt key={index} prompt={prompt} handleDelete={handleDelete} />
        ))}
    </section>
  );
}
