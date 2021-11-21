import { Link, Outlet } from "react-router-dom";


export default function Categories({ userCategories }) {

  return (
    <section className="main" id="categories">
      <h1>Add or Edit your Categories</h1>
      <div id="categories__main">
        <section className="categories__nav">
          <ul>
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
