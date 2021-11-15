import React from "react";
import User from "../img/user.svg";
import Heart from "../img/heart-solid.svg"

export default function Prompt({ prompt, handleDelete }) {
  return (
    <article className="prompts">
      <section className="prompts__main">
        <p>#{prompt.prompt_id}</p>
        <p className="prompts__description">{prompt.prompt_description}</p>
        <div className="prompts__requirements">
          {prompt.prompt_requirements &&
            prompt.prompt_requirements
              .split("|")
              .map((e, i) => <p key={i}>{e}</p>)}
        </div>

        <p>{prompt.category_name}</p>
      </section>

      <footer className="prompts__footer">
        {/* <section>
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
          </a>{" "}
          <div>
            <p>{prompt.user_nickname}</p>
          </div>
        </div>
        <div className="prompts-footer__options">
            <img className="heart" src={Heart} alt="heart" />
          
          <button>Fork</button>
          <button>Edit</button>
          <button onClick={() => handleDelete(prompt)}>Delete</button>
        </div>
      </footer>
    </article>
  );
}
