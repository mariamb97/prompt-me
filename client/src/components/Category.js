import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Prompt from "./Prompt";


export default function Category() {

  const [prompts, setPrompts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {

    try {
      const res = await fetch(`/categories/${id}/prompts`);
      const prompts = await res.json();
      setPrompts(prompts);
      // console.log(prompts)

    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (prompt) => {
    deletePrompt(prompt.id);
  };

  const deletePrompt = async (promptId) => {
    try {
      await fetch(`/prompts/${promptId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      getData(id)
    } catch (err) {
      console.log(err);;
    }
  };

  return (
    <section>
      {prompts.length > 0 &&
        <h1>{prompts[0].name}</h1>}

      {prompts.map((prompt, index) => (
        <Prompt key={index} prompt={prompt} handleDelete={handleDelete} />
      ))}
    </section>
  );
}
