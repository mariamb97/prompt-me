import React, { useEffect, useState } from "react";
import Prompt from "./Prompt";


export default function Home({ userCategories }) {
  const [userPrompts, setUserPrompts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({})


  useEffect(() => {
    getFilteredPromptsByCategory();
  }, []);

  const handleFilterAll = () => {
    getFilteredPromptsByCategory();
  };

  const handleClickCategory = (category, categoryId) => {
    setCurrentCategory(category)
    getFilteredPromptsByCategory(categoryId);
  };


  const getFilteredPromptsByCategory = (categoryId) => {
    let queryString = ""
    if (categoryId) queryString = `/?categories[]=${categoryId}`

    fetch(`/prompts/users${queryString}`, {
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

  const deletePrompt = async (promptId) => {
    let queryString = ""

    if (currentCategory.id) queryString = `/?categories[]=${currentCategory.id}`

    try {
      const response = await fetch(`/prompts/${promptId}${queryString}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const userPrompts = await response.json();
      setUserPrompts(userPrompts)

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
                  <button onClick={() => handleClickCategory(category, category.id)}>
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
