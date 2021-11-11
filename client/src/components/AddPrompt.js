import React, { useState } from 'react';

export default function AddPrompt() {

    let [alert, setAlert] = useState(null);
    let [prompt, setPrompt] = useState(null);
    let [description, setDescription] = useState("");
    let [requirements, setRequirements] = useState("");
    let [links, setLinks] = useState("");
    let [categories, setCategories ] = useState( "" );
    let [userId, setUserId] = useState("");
    
    const handleChangeDescription = (e) => setDescription(e.target.value);
    const handleChangeRequirements = (e) => setRequirements(e.target.value);
    const handleChangeLinks = (e) => setLinks(e.target.value);
    const handleChangeCategories = (e) => setCategories(e.target.value);
    const handleChangeUserId = ( e ) => setUserId( e.target.value );
    
    const handleSubmit = ( e ) => {
        e.preventDefault();
        console.log(description, categories, userId)
        addPrompt();
    }

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
                prompt_links: links,
                user_id: userId,
                category_id: categories,
              }),
            } );
                
                setDescription( "" );
                setRequirements("");
                setLinks("");
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
            <div id="description">
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
            <div>
              <label htmlFor="input_requirements">Requirements</label>
              <input
                id="input_requirements"
                name="input_requirements"
                value={requirements}
                onChange={(e) => handleChangeRequirements(e)}
              />
            </div>
            <div>
              <label htmlFor="input_links">Links</label>
              <input
                id="input_links"
                name="input_links"
                value={links}
                onChange={(e) => handleChangeLinks(e)}
              />
            </div>
            <div>
              <label htmlFor="input_categories">Categories*</label>
              <input
                id="input_categories"
                name="input_categories"
                required
                type="number"
                value={categories}
                onChange={(e) => handleChangeCategories(e)}
              />
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
              <p>This new prompt has been added: </p>

              <p>{prompt.prompt_description}</p>
              <p>{prompt.prompt_requirements}</p>
              <p>{prompt.prompt_links}</p>
              <p>{prompt.categories_id}</p>
              <p>{prompt.user_id}</p>
            </div>
          )}
        </section>
      </section>
    );
}
