// This is the component for adding a category. It has a form with a post request to the database, and a section to display the returned data.

import React, { useState } from 'react';

export default function AddCategory() {
  // These are all the use states.
  let [ alert, setAlert ] = useState( null );
  let [ category, setCategory ] = useState( null );
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [ userId, setUserId ] = useState( "" );

  // These functions handle the input changes.
  const handleChangeName = e => setName( e.target.value );
  const handleChangeUserId = (e) => setUserId(e.target.value);
  const handleChangeDescription = ( e ) => setDescription( e.target.value );
  
  // This function handles the submit. It prevents the event and calls the function that calls the database.
  const handleSubmit = ( e ) => {
    e.preventDefault();
    addCategory();
  }

  // This function calls the database and displays
  const addCategory = async () => {
    if ( name && description && userId ) {
      try {
        const res = await fetch( "/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify( {
            category_name: name,
            category_description: description,
            user_id: userId,
          } ),
        } );
        
        setDescription( " " );
        setName( "" );
        setUserId("");

        const category = await res.json();
        setCategory( category[0] );
        console.log( "category: " + JSON.stringify( category ) );
        if(category) return setAlert("Category added succesfully.")

      } catch ( err ) {
        console.log( err );
        setAlert( err );
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
          <div>
            <label htmlFor="input_userId">User Id</label>
            <input
              id="input_userId"
              name="input_userId"
              type="number"
              value={userId}
              onChange={(e) => handleChangeUserId(e)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>

        <section>
          {alert && <p>{alert}</p>}
          {category && (
            <div>
              <div>
                <p>Name: {category.category_name}</p>
                <p>Description: {category.category_description}</p>
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
