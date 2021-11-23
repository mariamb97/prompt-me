import React, { useState, useEffect } from "react";
import User from "../img/user.svg";
import Heart from "../img/heart-solid.svg"
import UseDebounce from "../hooks/useDebounce";


export default function Prompt({ Prompt, handleDelete, setUserPrompts, PromptIndex, getUserFavoritePrompts }) {
  const [userPrompt, setUserPrompt] = useState(Prompt)
  // const { current } = useRef({ data: userPrompt, timer: null });

  let debouncedUserPrompt
  if (userPrompt) {
    debouncedUserPrompt = UseDebounce(userPrompt.text, 600)
  }


  useEffect(() => {
    if (userPrompt) {
      updatePrompt()
    }
  }, [debouncedUserPrompt], [userPrompt.favorite])

  const promptIndex = PromptIndex
  const prompt = Prompt
  const refreshPrompts = () => {
    if (prompt !== userPrompt) {
      setUserPrompts((prompts) => [...prompts.slice(0, promptIndex), userPrompt, ...prompts.slice(promptIndex + 1)])
    }
  }

  const refreshFavoritePrompt = () => {
    setUserPrompts((prompts) => [...prompts.slice(0, promptIndex), userPrompt, ...prompts.slice(promptIndex + 1)])
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
      const response = await fetch(`/prompts/${id}/favorites`, {
        method: "PUT",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        }
      });
      const uptdatedUserPrompt = await response.json();
      setUserPrompt(uptdatedUserPrompt[0])
      refreshFavoritePrompt()
    } catch (err) {
      console.log(err);
    }
  }


  const updatePublicPrompt = async () => {
    const { id } = userPrompt
    try {
      const response = await fetch(`/prompts/${id}/publics`, {
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


  const handleToggleFavorite = (favorite) => {
    updateFavoritePrompt()
    if (favorite) {
      getUserFavoritePrompts()
    }
  }

  const handleTogglePublicPrompt = () => {
    updatePublicPrompt()
  }

  let promptData = userPrompt["updated_at"]
  let promptTime
  if (userPrompt) {
    promptData = promptData.split('T')
    promptTime = promptData[1].substr(0, 5)
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
      </section>

      <footer className="prompts__footer">
        <div className="prompts-footer__author">
          <a href="/profile">
            <div>
              <img src={User} alt="user avatar"></img>
            </div>
          </a>
          <div>
            <p>{prompt.nickname}</p>
          </div>
          <span id="prompt-data">{promptData[0]}</span>
          <span id="prompt-time">{promptTime}</span>
        </div>
        <div className="prompts-footer__options">
          <img className={`heart ${userPrompt.favorite ? "favourite" : null}`} src={Heart} alt="heart" onClick={() => handleToggleFavorite(userPrompt.favorite)} />
          {userPrompt.public ? <button onClick={() => handleTogglePublicPrompt()}>Set as private</button> : <button onClick={() => handleTogglePublicPrompt()}>Set as public</button>}
          <button onClick={(event) => handleDelete(event, userPrompt.id)}>Delete</button>
        </div>
      </footer>
    </article>
  );
}
