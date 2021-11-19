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
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"))
  const [userCategories, setUserCategories] = useState([]);
  const [alert, setAlert] = useState(null);


  useEffect(() => {
    getUserCategories()
  }, []);

  function onSuccess(boolean) {
    setIsAuth(boolean)
  }

  function addUserCategory(userCategory) {
    console.log(userCategory)
    setUserCategories((state) => ([...state, userCategory]))
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
      setAlert(err);
    }
  }


  return (
    <div id="wrapper">
      <BrowserRouter>
        <Header onSuccess={onSuccess} isAuth={isAuth} />
        <Routes>
          <Route path="/authentication" element={<UserAuthentication onSuccess={onSuccess} />} />
          <Route path="/register" element={<AddUser />} />
          <Route path="/"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Home userCategories={userCategories} />
              </ProtectedRoute>
            }
          />
          <Route path="/add"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <AddPrompt userCategories={userCategories} />
              </ProtectedRoute>
            }
          />
          <Route path="/categories"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Categories userCategories={userCategories} />
              </ProtectedRoute>
            }
          >
            <Route path="add" element={<AddCategory addUserCategory={addUserCategory} />} />
            <Route path=":id" element={<Category />} />
          </Route>
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

// <BrowserRouter>
// <Header />
// <Routes>
//   <Route path="/" element={<Home />} />
//   <Route path="/add" element={<AddPrompt />} />
//   <Route path="/authentication" element={<UserAuthentication />} />
//   <Route path="/register" element={<AddUser />} />
//   <Route path="/categories" element={<Categories />}>
//     <Route path="add" element={<AddCategory />} />
//     <Route path=":id" element={<Category />} />
//   </Route>
//   {/* <ProtectedRoute path="/profile" component={Profile} isAuth={isAuth} /> */}
//   <Route
//     path="/profile"
//     element={
//       <ProtectedRoute>
//         <Profile />
//       </ProtectedRoute>
//     }
//   />
// </Routes>
// </BrowserRouter>


