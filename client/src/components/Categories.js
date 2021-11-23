import { Link, Outlet } from "react-router-dom";
import React, { useState, useEffect } from 'react';


export default function Categories({ userCategories, commonCategories }) {

  return (
    <section className="main" id="categories">
      <h1>Add or Edit your Categories</h1>
      <div id="categories__main">
        <section className="categories__nav">
          <ul>
            {commonCategories && commonCategories.map((category) => (
              <li key={category.id}>
                <Link to={`/categories/${category.id}`}>
                  {category.name}
                </Link>
              </li>
            ))}
            {userCategories &&
              userCategories.map((category, i) => (
                <li key={i}>
                  <Link to={`/categories/${category.id}`}>
                    {category.name}
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
