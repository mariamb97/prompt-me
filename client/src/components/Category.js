import React, {useState, useEffect } from 'react';
import { Link } from "react-router-dom";


export default function Category() {

  let [ categories, setCategories ] = useState( [] );
  let [ error, setError ] = useState( null );

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
      setError( error );
    }
  }

    return (
      <section id="categories">
        <h1>Category View</h1>
        <div>
          <Link to="/category/add">Add Category</Link>
        </div>
        <section>
          <ul>
            {categories &&
              categories.map((category, i) => (
                <li key={i}>
                  <a href={`./`+(category.category_name).toLowerCase()}>{category.category_name}</a>
                </li>
              ))}
          </ul>
        </section>
      </section>
    );
}
