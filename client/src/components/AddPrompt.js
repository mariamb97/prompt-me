import React, { useState, useEffect } from 'react';

export default function AddPrompt() {

    let [alert, setAlert] = useState(null);
    let [prompt, setPrompt] = useState(null);
    let [description, setDescription] = useState("");
    let [requirements, setRequirements] = useState("");
    let [categories, setCategories ] = useState( "");
    let [ userId, setUserId ] = useState( "" );
    let [ listCategories, setListCategories ] = useState( [] );
    
    const handleChangeDescription = (e) => setDescription(e.target.value);
    const handleChangeRequirements = (e) => setRequirements(e.target.value);
    const handleChangeCategories = (e) => setCategories(e.target.value);
  const handleChangeUserId = ( e ) => setUserId( e.target.value );  
  
  useEffect(() => {
    getCategories();
  }, [] );
    
    const handleSubmit = ( e ) => {
        e.preventDefault();
        console.log(description, categories, userId)
        addPrompt();
    }
  
    const getCategories = async () => {
      try {
        const res = await fetch("/categories", {});
        const listCategories = await res.json();
        setListCategories(listCategories);
      } catch (err) {
        console.log(err);
        setAlert(err);
      }
    };

    const addPrompt = async () => {
        if (description && categories && userId) {
            try {
            const res = await fetch("/prompts", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                prompt_description: description,
                prompt_requirements: requirements,
                user_id: userId,
                category_id: categories,
              }),
            } );
                
                setDescription( "" );
                setRequirements("");
                setCategories( "" );
                setUserId( "" );
                
                const prompt = await res.json();
                setPrompt( prompt[0] );
                console.log( "prompt: ", prompt )
                setAlert( "Prompt added succesfully." );
                
                
          } catch (err) {
            console.log(err);
            setAlert(err);
          }
        } else {
          setAlert("Please fill the mandatory fields.");
        }
    }
    

    return (
      <section id="addPrompt">
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
                value={description}
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
                value={requirements}
                onChange={(e) => handleChangeRequirements(e)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="input_categories">Categories*</label>
              <select
                id="input_categories"
                name="input_categories"
                value={categories}
                onChange={(e) => handleChangeCategories(e)}
              >
                <option>Choose a category</option>
                {listCategories &&
                  listCategories.map((categoryElement, i) => (
                    <option key={i} value={`${categoryElement.category_id}`}>
                      {categoryElement.category_name}
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

                <p>Description: {prompt.prompt_description}</p>
                <p>Requirements: {prompt.prompt_requirements}</p>
                <p>Categories: {prompt.category_name}</p>
                <p>Author: {prompt.user_nickname}</p>
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
