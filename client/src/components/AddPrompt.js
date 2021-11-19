import React, { useState, useEffect } from 'react';

export default function AddPrompt({ userCategories }) {

  let [alert, setAlert] = useState(null);
  let [prompt, setPrompt] = useState(null);
  let [descriptionInput, setDescription] = useState("");
  let [requirementsInput, setRequirements] = useState("");
  let [categoryInput, setCategories] = useState("");
  let [userId, setUserId] = useState("");

  const handleChangeDescription = (e) => setDescription(e.target.value);
  const handleChangeRequirements = (e) => setRequirements(e.target.value);
  const handleChangeCategories = (e) => setCategories(e.target.value);
  const handleChangeUserId = (e) => setUserId(e.target.value);



  const handleSubmit = (e) => {
    e.preventDefault();
    addPrompt();
  }


  const addPrompt = async () => {
    if (descriptionInput && categoryInput && userId) {
      try {
        const res = await fetch("/prompts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            description: descriptionInput,
            requirements: requirementsInput,
            user_id: userId,
            category_id: categoryInput,
          }),
        });

        setDescription("");
        setRequirements("");
        setCategories("");
        setUserId("");

        const prompt = await res.json();
        setPrompt(prompt[0]);
        console.log("prompt: ", prompt)
        setAlert("Prompt added succesfully.");


      } catch (err) {
        console.log(err);
        setAlert(err);
      }
    } else {
      setAlert("Please fill the mandatory fields.");
    }
  }


  return (
    <section className="main" id="addPrompt">
      <h1>Add New Prompt</h1>
      <section>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="textarea">
            <label htmlFor="input_description">Description*</label>
            <textarea
              id="input_description"
              name="input_description"
              rows="5"
              required
              value={descriptionInput}
              onChange={(e) => handleChangeDescription(e)}
            ></textarea>
          </div>
          <div className="textarea">
            <label htmlFor="input_requirements">
              Requirements (separate with "|")
            </label>
            <textarea
              id="input_requirements"
              name="input_requirements"
              value={requirementsInput}
              onChange={(e) => handleChangeRequirements(e)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="input_categories">Categories*</label>
            <select
              id="input_categories"
              name="input_categories"
              value={categoryInput}
              onChange={(e) => handleChangeCategories(e)}
            >
              <option>Choose a category</option>
              {userCategories &&
                userCategories.map((category, i) => (
                  <option key={i} value={`${category.id}`}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="input_userId">User ID*</label>
            <input
              id="input_userId"
              name="input_userId"
              required
              type="number"
              value={userId}
              onChange={(e) => handleChangeUserId(e)}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </section>
      <section>
        {alert && <p>{alert}</p>}
        {prompt && (
          <div>
            <div>
              <p>This new prompt has been added: </p>

              <p>Description: {prompt.description}</p>
              <p>Requirements: {prompt.requirements}</p>
              <p>Categories: {prompt.name}</p>
              <p>Author: {prompt.nickname}</p>
            </div>
            <p>
              Check all the prompts <a href="/">here.</a>
            </p>
          </div>
        )}
      </section>
    </section>
  );
}
