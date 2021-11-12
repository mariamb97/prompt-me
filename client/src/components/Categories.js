import React, {useState, useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";


export default function Category() {

  let [ categories, setCategories ] = useState( [] );
  let [alert, setAlert] = useState(null);

  useEffect( () => {
    getCategories();
  }, [] );

  const getCategories = async () => {
    try {
      const res = await fetch( "/categories", {} );
      const categories = await res.json();
      setCategories( categories );
      console.log( categories );

    } catch ( err ) {
      console.log( err );
      setAlert( err );
    }
  }

    return (
      <section id="categories">
        <h1>Category View</h1>
        {alert && <p>{alert}</p>}
        <div id="categories_main">
          <section>
            <ul>
              {categories &&
                categories.map((category, i) => (
                  <li key={i}>
                    <Link to={`/categories/${category.category_id}`}>
                      {category.category_name}
                    </Link>
                  </li>
                ))}
            </ul>
            <Link to="/categories/add">Add Category</Link>
          </section>
          <section>
            <Outlet />
          </section>
        </div>
      </section>
    );
}
