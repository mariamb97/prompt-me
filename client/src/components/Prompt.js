import React, { useState, useEffect } from "react";
import User from "../img/user.svg";
import Heart from "../img/heart-solid.svg"
import UseDebounce from "../hooks/useDebounce";


export default function Prompt({ prompt, handleDelete, getFilteredPromptsByCategory }) {
  const [userPrompt, setUserPrompt] = useState(prompt)
  // const { current } = useRef({ data: userPrompt, timer: null });

  let debouncedUserPrompt
  if (userPrompt) {
    debouncedUserPrompt = UseDebounce(userPrompt.text, 600)
  }


  useEffect(() => {
    if (userPrompt) {
      updatePrompt()
    }
  }, [debouncedUserPrompt])


  const refreshPrompts = () => {
    if (prompt !== userPrompt) {
      getFilteredPromptsByCategory(prompt.category_id)
      window.scrollTo(0, 0)
    }
  }

  const handleChangeTextInput = (event) => {
    event.preventDefault()

    const { value, name } = event.target;
    setUserPrompt((state) => ({ ...state, [name]: value }))

    // if (current.timer) { clearTimeout(current.timer) }
    // current.timer = setTimeout(() => {
    //   current.timer = null;
    //   current.data = userPrompt
    //   console.log("Saving...", current.data);
    //   updatePrompt()
    // }, 1000);

  }

  const updatePrompt = async () => {
    const { text, id } = userPrompt
    try {
      const response = await fetch(`/prompts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          text: text,
        }),
      });
      const userPrompt = await response.json();
      setUserPrompt(userPrompt[0])
      refreshPrompts()
    } catch (err) {
      console.log(err);
    }
  }

  const updateFavoritePrompt = async () => {
    const { id } = userPrompt
    try {
      const response = await fetch(`/prompts/${id}/favorite`, {
        method: "PUT",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        }
      });
      const userPrompt = await response.json();
      setUserPrompt(userPrompt[0])
      refreshPrompts()
    } catch (err) {
      console.log(err);
    }
  }


  const handleToggleFavorite = () => {
    updateFavoritePrompt()
  }


  return (
    <article className="prompts">
      <section className="prompts__main">
        <p>#{prompt.name}</p>
        <div className="prompts__description" >
          <textarea name="text" id="prompt_text_area" value={userPrompt.text} onChange={handleChangeTextInput} ></textarea>
        </div>
        <div className="prompts__requirements">
          {prompt.requirements}
        </div>
        {/* <div className="prompts__requirements">
          <textarea value={prompt.requirements} ></textarea>
        </div> */}
      </section>

      <footer className="prompts__footer">
        {/* 
          This is a feature to show the forks of each prompt, not yet implemented.
          <section>
            <p>Links:</p>
                {prompt.prompt_links &&
                    prompt.prompt_links.split("|").map((e, i) => <p key={i}>{e}</p>)}
            </section>
            
            <button>Associate links</button> */}
        <div className="prompts-footer__author">
          <a href="/profile">
            <div>
              <img src={User} alt="user avatar"></img>
            </div>
          </a>
          <div>
            <p>{prompt.nickname}</p>
          </div>
        </div>
        <div className="prompts-footer__options">
          <img className={`heart ${prompt.favorite ? "favourite" : null}`} src={Heart} alt="heart" onClick={() => handleToggleFavorite()} />
          <button>Fork</button>
          <button onClick={(event) => handleDelete(event, prompt.id)}>Delete</button>
        </div>
      </footer>
    </article>
  );
}
