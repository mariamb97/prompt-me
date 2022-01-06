import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function User({ onSuccess, getUserCategories }) {
  let [alert, setAlert] = useState(null);
  let [user, setUser] = useState(null);
  const [inputLogIn, setInputLogIn] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();


  const handleChangeInputLogIn = (event) => {
    const { value, name } = event.target;
    setInputLogIn((state) => ({ ...state, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    logIn()
  }


  const logIn = async () => {
    if (inputLogIn.username && inputLogIn.password) {
      try {
        const response = await fetch("/authentication/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nickname: inputLogIn.username,
            password: inputLogIn.password
          }),
        });
        const data = await response.json();
        if (data.token) {
          localStorage.setItem("token", data.token);
          onSuccess(true)
          getUserCategories()
          navigate("/")
        }
        else {
          setAlert(data.message)
        }
      } catch (err) {
        setAlert(err);
        console.log(err);
      }
    } else {
      setAlert("Please fill all the fields.");
    }
  };

  // const getUser = async (e) => {
  //   try {
  //     const res = await fetch(`users/${username}`, {});
  //     const user = await res.json();
  //     setUser(user);
  //     console.log(user);

  //   } catch (err) {
  //     console.log(err);
  //     setAlert(err);
  //   }
  // }

  // FAILED ATTEMPT AT DELETING USERS - LINKED TABLES GIVE TROUBLE TO DELETE

  // const handleDelete = (id) => {
  //   console.log( id );
  //   deleteUser(id)
  // }

  // const deleteUser = async (id) => {
  //   try {
  //     const res = await fetch(`/users/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });


  //   } catch (err) {
  //     console.log(err);
  //     setAlert(err);
  //   }
  // };

  return (
    <section className="main" id="user">
      <h1>Please Register or Log In</h1>
      <section className="user__wrap">
        <article>
          <h3>Log In</h3>
          <div>
            <form className="user__login" onSubmit={(event) => handleSubmit(event)}>
              <label htmlFor="user_id">Username</label>
              <input
                id="user_id"
                type="text"
                name="username"
                value={inputLogIn.username}
                onChange={(event) => handleChangeInputLogIn(event)}
              />
              <label htmlFor="user_password_login">Password</label>
              <input
                id="user_password_login"
                type="password"
                name="password"
                value={inputLogIn.password}
                onChange={(event) => handleChangeInputLogIn(event)}
              />
              <button type="submit">Log in</button>
            </form>
          </div>
        </article>
        <article className="user__register">

          <h3>Sign Up</h3>
          <button><Link to="/register">Click to register</Link></button>

        </article>
      </section>
      {alert && <p>{alert}</p>}
      <section id="user_info">
        {user && (
          <article>
            <p>This is your information: </p>
            <div>
              <p>User ID: {user.id}</p>
              <p>Username: {user.nickname}</p>
              <p>Name: {user.firstname}</p>
              <p>Surname: {user.lastname}</p>
              <p>Password: {user.password}</p>
            </div>
            {/* <div>
              <button>Edit</button>
              <button onClick={() => handleDelete(user.user_id)}>Delete</button>
            </div> */}
          </article>
        )}
      </section>
    </section>
  );
}
