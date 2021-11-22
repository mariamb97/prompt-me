import React, { useState } from "react";
import Prompt from "./Prompt";
import "./Prompt.css"


function Home({ userCategories, userPrompts, getFilteredPromptsByCategory, setUserPrompts }) {
  const [currentCategory, setCurrentCategory] = useState({})


  const handleFilterAll = () => {
    getFilteredPromptsByCategory();
  };

  const handleClickCategory = (category, categoryId) => {
    setCurrentCategory(category)
    getFilteredPromptsByCategory(categoryId);
  };


  const handleDelete = (event, promptId) => {
    event.preventDefault()
    deletePrompt(promptId);
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
        userPrompts.map((prompt) => (
          <Prompt key={prompt.id} prompt={prompt} setUserPrompts={setUserPrompts} handleDelete={handleDelete} />
        ))}
    </section>
  );
}

export default Home;
