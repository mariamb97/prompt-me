import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import AddPrompt from "./components/AddPrompt";
import AddUser from "./components/AddUser";
import User from "./components/User";
import AddCategory from "./components/AddCategory";
import Nav from "./components/Nav";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<AddUser />} />
        <Route path="/add" element={<AddPrompt />}>
          <Route path=":id" element={<User />} />
        </Route>
        <Route path="/addcategory" element={<AddCategory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
