import React, { useState } from "react";
import Prompt from "./Prompt";
import "./Prompt.css"


function Home({ userCategories, commonCategories, userPrompts, getFilteredPromptsByCategory, setUserPrompts }) {
  const [currentCategory, setCurrentCategory] = useState({})


  const handleFilterAll = () => {
    getFilteredPromptsByCategory();
    setCurrentCategory({})
  };

  const handleClickCategory = (category) => {
    setCurrentCategory(category)
    getFilteredPromptsByCategory(category.id);
  };

  const handleClickFavorites = () => {
    getUserFavoritePrompts()
  }

  const handleDelete = (event, promptId) => {
    event.preventDefault()
    deletePrompt(promptId);
  };

  const getUserFavoritePrompts = async () => {
    try {
      const response = await fetch("/prompts/users/favorites", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const userFavoritePrompts = await response.json();
      if (!userFavoritePrompts.message) {
        setUserPrompts(userFavoritePrompts);
      }
    } catch (err) {
      console.log(err);
    }
  }

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
          {commonCategories[0] && <li> <button onClick={() => handleClickFavorites(commonCategories[1])} > {commonCategories[0].name}</button> </li>}
          {commonCategories[1] && <li> <button onClick={() => handleClickCategory(commonCategories[1])}>{commonCategories[1].name}</button> </li>}

          {userCategories &&
            userCategories
              .map((category, i) => (
                <li key={i}>
                  <button onClick={() => handleClickCategory(category)}>
                    {category.name}
                  </button>
                </li>
              ))}
        </ul>
      </div>
      {userPrompts &&
        userPrompts.map((prompt) => (
          <Prompt key={prompt.id} prompt={prompt} getFilteredPromptsByCategory={getFilteredPromptsByCategory} handleDelete={handleDelete} />
        ))}
    </section >
  );
}

export default Home;
