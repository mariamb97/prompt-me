import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import handleDelete from "./Home";
import Prompt from "./Prompt";


export default function Category() {
  const { id } = useParams();
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    console.log(id);
    const response = await fetch(`/categories/${id}/prompts`);
    const prompts = await response.json();
    setPrompts( prompts );
  };

  return (
   
      <section>
      <h1>{ prompts[0].prompt_description}</h1>
        {prompts.map((prompt, index) => (
          <Prompt key={index} prompt={prompt} handleDelete={handleDelete} />
        ))}
      </section>
   
  );
}
