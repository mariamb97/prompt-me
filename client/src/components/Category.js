import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function Category({ getUserCategories }) {
  const [userCategory, setUserCategory] = useState({})
  const { id } = useParams();

  useEffect(() => {
    getUserCategory();
  }, [id]);

  const getUserCategory = async () => {

    try {
      const res = await fetch(`/categories/${id}`);
      const category = await res.json();
      setUserCategory(category);

    } catch (error) {
      console.log(error);
    }
  };

  const updateCategory = async () => {
    const { name, description } = userCategory

    try {
      const response = await fetch(`/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: name,
          description: description,
        }),
      });
      const userCategory = await response.json();
      if (!userCategory.message) {
        setUserCategory(userCategory[0]);
        getUserCategories()
      }
    } catch (err) {
      console.log(err);
    }
  }


  const deleteCategory = async () => {
    try {
      await fetch(`/categories/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setUserCategory({})
      getUserCategories()
    } catch (err) {
      console.log(err);;
    }
  };



  const handleChangeUpdateCategoryInput = (event) => {
    const { value, name } = event.target;
    setUserCategory((state) => ({ ...state, [name]: value }));
  }

  const handleSubmitUpdateCategory = (event) => {
    event.preventDefault()
    updateCategory()
  }

  return (
    <section>
      {userCategory.name &&
        <form>
          <div>
            <label htmlFor="input_name">Name</label>
            <input
              id="category_name_input"
              name="name"
              value={userCategory.name}
              onChange={handleChangeUpdateCategoryInput}
            />
          </div>
          <div id="description">
            <label htmlFor="category_description_input">Description</label>
            <input
              id="category_description_input"
              name="description"
              value={userCategory.description}
              onChange={handleChangeUpdateCategoryInput}
            ></input>
          </div>

          <button type="submit" onClick={(event) => handleSubmitUpdateCategory(event)}>OK</button>
        </form>
      }
      {userCategory.name && <div>
        <button onClick={deleteCategory}>Delete</button>
      </div>}
    </section>
  );
}
