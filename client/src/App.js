import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import AddPrompt from "./components/AddPrompt";
import AddUser from "./components/AddUser";
import User from "./components/User";
import AddCategory from "./components/AddCategory";
import Header from "./components/Header";
import Category from "./components/Category";

function App() {
  return (
    <div id="wrapper">
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<AddUser />} />
        <Route path="/add" element={<AddPrompt />} />
        <Route path="profile" element={<User />} />
        <Route path="/category" element={ <Category /> } >
          <Route path="/category/:name" element={ <Category /> } />
          </Route>

        
        <Route path="/category/add" element={<AddCategory />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
