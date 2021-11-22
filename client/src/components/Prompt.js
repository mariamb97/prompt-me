import React, { useState, useRef } from "react";
import User from "../img/user.svg";
import Heart from "../img/heart-solid.svg"

let processChange

function debounce(func, timeout = 300) {
  console.log("debounce")
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}


export default function Prompt({ prompt, handleDelete, setUserPrompts }) {
  let [favourite, setFavourite] = useState(false);
  const [userPrompt, setUserPrompt] = useState(prompt)
  // const { current } = useRef({ data: userPrompt, timer: null });

  const handleToggle = () => {
    setFavourite(!favourite);
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

    processChange()


  }

  const updatePrompt = async () => {
    const { text, id } = userPrompt
    console.log("updating")
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
      const userPrompts = await response.json();
      if (userPrompt.text) {
        console.log(userPrompts)
        // setUserPrompt(userPrompts[0]);
        // setUserPrompts(userPrompts)
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (!processChange) processChange = debounce(updatePrompt)

  return (
    <article className="prompts">
      {/* <section className="prompts__main">
        <p>#{prompt.name}</p>
        <p className="prompts__description">{prompt.text}</p>
        <div className="prompts__requirements">
          {prompt.requirements}
        </div>
        <p className="prompts__categories">{prompt.name}</p>
      </section> */}

      <section className="prompts__main">
        <p>#{prompt.name}</p>
        <div className="prompts__description" >
          <textarea name="text" id="prompt_text_area" value={userPrompt.text} onChange={handleChangeTextInput} ></textarea>
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
          <img className={`heart ${favourite ? "favourite" : null}`} src={Heart} alt="heart" onClick={() => handleToggle()} />
          <button>Fork</button>
          <button>Edit</button>
          <button onClick={(event) => handleDelete(event, prompt.id)}>Delete</button>
        </div>
      </footer>
    </article>
  );
}
