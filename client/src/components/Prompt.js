import React from 'react';

export default function Prompt({ prompt, handleDelete }) {
  return (
    <article>
      <section>
        <p>#{prompt.prompt_id}</p>
        <p>{prompt.prompt_description}</p>
        <div>
          <p>Requirements:</p>
          {prompt.prompt_requirements &&
            prompt.prompt_requirements
              .split("|")
              .map((e, i) => <p key={i}>{e}</p>)}
        </div>
        <p>Author: {prompt.user_nickname}</p>
        <p>Categories: {prompt.category_name}</p>
      </section>

      <section>
        {/* <section>
            <p>Links:</p>
                {prompt.prompt_links &&
                    prompt.prompt_links.split("|").map((e, i) => <p key={i}>{e}</p>)}
            </section>
            
            <button>Associate links</button> */}
        <button>Favourite</button>
        <button>Edit</button>
        <button onClick={() => handleDelete(prompt)}>Delete</button>
      </section>
    </article>
  );
}
