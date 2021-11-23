import React, { useEffect, useState } from "react";
import Prompt from "./Prompt";
import "./Prompt.css"


function Home({ userCategories, commonCategories, userPrompts, getFilteredPromptsByCategory, setUserPrompts }) {
  const [currentCategory, setCurrentCategory] = useState({})

  useEffect(() => {
    getFilteredPromptsByCategory();
  }, [])


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
      <h3>PROMPTS</h3>
      <p>Select a category:</p>
      <div className="filters_nav">
        <ul>
          <li>
            <button onClick={() => handleFilterAll()}>All</button>
          </li>
          <li>{commonCategories[0] && <button onClick={() => handleClickFavorites(commonCategories[1])} > {commonCategories[0].name}</button>}</li>
          <li>  {commonCategories[1] && <button onClick={() => handleClickCategory(commonCategories[1])}>{commonCategories[1].name}</button>}</li>
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
      <div>
        {userPrompts &&
          userPrompts.map((prompt, index) => (
            <Prompt key={prompt.id} Prompt={prompt} PromptIndex={index} setUserPrompts={setUserPrompts} getUserFavoritePrompts={getUserFavoritePrompts} handleDelete={handleDelete} />
          ))}
      </div>
    </section>
  );
}

export default Home;
