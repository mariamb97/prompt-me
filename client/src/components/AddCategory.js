import React, { useState } from 'react';

export default function AddCategory({ addUserCategory }) {
  let [alert, setAlert] = useState(null);
  let [category, setCategory] = useState(null);
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");


  const handleChangeName = e => setName(e.target.value);
  const handleChangeDescription = (e) => setDescription(e.target.value);


  const handleSubmit = (event) => {
    event.preventDefault();
    addCategory();
  }


  const addCategory = async () => {
    if (name && description) {
      try {
        const res = await fetch("/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            name: name,
            description: description,
          }),
        });

        setDescription(" ");
        setName("");

        const category = await res.json();

        addUserCategory(category[0])
        // setCategory(category[0]);

        if (category) return setAlert("Category added succesfully.")

      } catch (err) {
        console.log(err);
        setAlert(err);
      }

    } else {
      setAlert("Please fill all the fields.")
    }
  }

  return (
    <section>
      <form onSubmit={(e) => handleSubmit(e)}>
        <p>Add New Category</p>
        <div>
          <label htmlFor="input_name">Name</label>
          <input
            id="input_name"
            name="input_name"
            value={name}
            onChange={(e) => handleChangeName(e)}
          />
        </div>
        <div id="description">
          <label htmlFor="input_description">Description</label>
          <input
            id="input_description"
            name="input_description"
            value={description}
            onChange={(e) => handleChangeDescription(e)}
          ></input>
        </div>
        <button type="submit">Submit</button>
      </form>

      <section>
        {alert && <p>{alert}</p>}
        {category && (
          <div>
            <div>
              <p>Name: {category.name}</p>
              <p>Description: {category.description}</p>
              <p>Author: {category.user_id}</p>
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
