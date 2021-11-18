import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import AddPrompt from "./components/AddPrompt";
import AddUser from "./components/AddUser";
import UserAuthentication from "./components/UserAuthentication";
import AddCategory from "./components/AddCategory";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Category from "./components/Category";

function App() {
  return (
    <div id="wrapper">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddPrompt />} />
          <Route path="/authentication" element={<UserAuthentication />} />
          <Route path="/register" element={<AddUser />} />
          <Route path="/categories" element={<Categories />}>
            <Route path="add" element={<AddCategory />} />
            <Route path=":id" element={<Category />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
