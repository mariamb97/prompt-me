import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "./App.css";

import Home from "./components/Home";
import AddPrompt from "./components/AddPrompt";
import AddUser from "./components/AddUser";
import UserAuthentication from "./components/UserAuthentication";
import AddCategory from "./components/AddCategory";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Category from "./components/Category";
import Profile from "./components/Profile";
import PublicPrompts from "./components/PublicPrompts";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"))
  const [commonCategories, setCommonCategories] = useState([])
  const [userCategories, setUserCategories] = useState([]);
  const [userPrompts, setUserPrompts] = useState([]);



  useEffect(() => {
    getCommonCategories();
    getUserCategories()
    getFilteredPromptsByCategory()
  }, []);


  function onSuccess(boolean) {
    setIsAuth(boolean)
  }

  const getCommonCategories = async () => {
    try {
      const response = await fetch("/categories/public", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const commonCategories = await response.json();
      if (!commonCategories.message) {
        console.log(commonCategories)
        setCommonCategories(commonCategories);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getUserCategories = async () => {
    try {
      const response = await fetch("/categories/users", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const userCategories = await response.json();
      if (!userCategories.message) {
        setUserCategories(userCategories);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getFilteredPromptsByCategory = async (categoryId) => {
    try {
      let queryString = ""
      if (categoryId) queryString = `/?categories[]=${categoryId}`

      const response = await fetch(`/prompts/users${queryString}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const prompts = await response.json();
      setUserPrompts(prompts)
    } catch (err) {
      console.log(err);
    }
  };

  function addUserCategory(userCategory) {
    setUserCategories((state) => ([...state, userCategory]))
  }


  return (
    <div id="wrapper">
      <BrowserRouter>
        <Header onSuccess={onSuccess} isAuth={isAuth} setUserCategories={setUserCategories} />
        <Routes>
          <Route path="/authentication" element={<UserAuthentication onSuccess={onSuccess} getUserCategories={getUserCategories} />} />
          <Route path="/register" element={<AddUser />} />
          <Route path="/"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Home userCategories={userCategories} commonCategories={commonCategories} userPrompts={userPrompts} setUserPrompts={setUserPrompts} getFilteredPromptsByCategory={getFilteredPromptsByCategory} />
              </ProtectedRoute>
            }
          />
          <Route path="/add"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <AddPrompt userCategories={userCategories} commonCategory={commonCategories[1]} setUserPrompts={setUserPrompts} />
              </ProtectedRoute>
            }
          />
          <Route path="/categories"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Categories userCategories={userCategories} commonCategories={commonCategories} />
              </ProtectedRoute>
            }
          >
            <Route path="add" element={<AddCategory addUserCategory={addUserCategory} />} />
            <Route path=":id" element={<Category getUserCategories={getUserCategories} />} />
          </Route>
          <Route
            path="/public"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <PublicPrompts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;



