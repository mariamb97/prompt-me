import React, {useState} from 'react';

export default function AddCategory() {
  let [ alert, setAlert ] = useState( null );
  let [ category, setCategory ] = useState( null );
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [ userId, setUserId ] = useState( "" );

  const handleChangeName = e => setName( e.target.value );
  const handleChangeUserId = (e) => setUserId(e.target.value);
  const handleChangeDescription = (e) => setDescription(e.target.value);

  const handleSubmit = ( e ) => {
    e.preventDefault();
    addCategory();
  }

  const addCategory = async () => {
    if ( name && description && userId ) {
      console.log("hello")
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
        console.log( "category: " + JSON.stringify(category) );
        setAlert("Category added succesfully.")

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
        <h1>Add New Category</h1>
        <section>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label htmlFor="input_name">Name</label>
              <input
                id="input_name"
                name="input_name"
                value={name}
                onChange={(e) => handleChangeName(e)}
              />
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
            <div id="description">
              <label htmlFor="input_description">Description</label>
              <textarea
                id="input_description"
                name="input_description"
                value={description}
                onChange={(e) => handleChangeDescription(e)}
              ></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        </section>
        <section>
          {alert && <p>{alert}</p>}
          { category && (
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
