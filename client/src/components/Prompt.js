import React, {useState} from "react";
import User from "../img/user.svg";
import Heart from "../img/heart-solid.svg"

export default function Prompt( { prompt, handleDelete } ) {
  let [ favourite, setFavourite ] = useState( false );

  const handleToggle = () => {
    setFavourite( !favourite );
  }

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

        <p className="prompts__categories">{prompt.category_name}</p>
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
            <p>{prompt.user_nickname}</p>
          </div>
        </div>
        <div className="prompts-footer__options">
          <img className={`heart ${favourite ? "favourite" : null}`} src={ Heart } alt="heart" onClick={()=>handleToggle()}/>
          <button>Fork</button>
          <button>Edit</button>
          <button onClick={() => handleDelete(prompt)}>Delete</button>
        </div>
      </footer>
    </article>
  );
}
