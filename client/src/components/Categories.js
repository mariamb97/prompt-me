import React, { useState, useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";


export default function Category() {
  // const [categories, setCategories] = useState([]);
  const [userCategories, setUserCategories] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    // getCategories();
    getUserCategories()
  }, []);

  // const getCategories = async () => {
  //   try {
  //     const res = await fetch("/categories", {});
  //     const categories = await res.json();
  //     setCategories(categories);

  //   } catch (err) {
  //     console.log(err);
  //     setAlert(err);
  //   }
  // }

  const getUserCategories = async () => {
    try {
      const response = await fetch("/categories/users", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const userCategories = await response.json();
      setUserCategories(userCategories);

    } catch (err) {
      console.log(err);
      setAlert(err);
    }
  }

  return (
    <section className="main" id="categories">
      <h1>Category View</h1>
      {alert && <p>{alert}</p>}
      <div id="categories__main">
        <section className="categories__nav">
          <ul>
            {userCategories &&
              userCategories.map((userCategory, i) => (
                <li key={i}>
                  <Link to={`/categories/${userCategory.id}`}>
                    {userCategory.name}
                  </Link>
                </li>
              ))}
          </ul>
          <Link className="categories__add" to="/categories/add">Add Category</Link>
        </section>
        <section className="categories__secondary">
          <Outlet />
        </section>
      </div>
    </section>
  );
}
