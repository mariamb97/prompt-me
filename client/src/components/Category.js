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

  return (
    <section>
      <h1> {userCategory.name} </h1>
      <div> {userCategory.description} </div>
      {userCategory.name && <button onClick={deleteCategory}>Delete</button>}
    </section>
  );
}
