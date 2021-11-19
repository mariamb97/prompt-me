import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


export default function AddUser() {

  let [alert, setAlert] = useState(null);
  let [user, setUser] = useState(null);
  let [nickname, setNickname] = useState("");
  let [firstname, setFirstname] = useState("");
  let [lastname, setLastname] = useState("");
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");

  const navigate = useNavigate();


  const handleChangeNickname = (event) => setNickname(event.target.value);
  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangeFirstname = (event) => setFirstname(event.target.value);
  const handleChangeLastname = (event) => setLastname(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);


  const handleSubmit = (event) => {
    event.preventDefault();
    addUser();
  }


  const addUser = async () => {
    if (nickname && email && firstname && lastname && password) {
      try {
        const res = await fetch("/authentication/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            nickname: nickname,
            firstname: firstname,
            lastname: lastname,
            password: password
          }),
        });

        setEmail("");
        setNickname("");
        setFirstname("");
        setLastname("");
        setPassword("");
        setAlert("");

        const user = await res.json();
        setUser(user[0]);
        navigate("/authentication")
      } catch (err) {
        setAlert(err);
        console.log(err);
      }
    } else {
      setAlert("Please fill all the fields.");
    }
  };

  return (
    <section className="main" id="registration">
      <h1>Add New User</h1>
      <section>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="input_nickname">Username</label>
            <input
              id="input_nickname"
              name="input_nickname"
              value={nickname}
              onChange={(e) => handleChangeNickname(e)}
            />
          </div>
          <div>
            <label htmlFor="input_email">Email</label>
            <input
              id="input_email"
              name="input_email"
              value={email}
              onChange={(e) => handleChangeEmail(e)}
            />
          </div>
          <div>
            <label htmlFor="input_firstname">Name</label>
            <input
              id="input_firstname"
              name="input_firstname"
              value={firstname}
              onChange={(e) => handleChangeFirstname(e)}
            />
          </div>

          <div>
            <label htmlFor="input_lastname">Surname</label>
            <input
              id="input_lastname"
              name="input_lastname"
              value={lastname}
              onChange={(e) => handleChangeLastname(e)}
            />
          </div>

          <div>
            <label htmlFor="input_password">Password</label>
            <input
              id="input_password"
              name="input_password"
              type="password"
              value={password}
              onChange={(e) => handleChangePassword(e)}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </section>

      <section>
        {alert && <p>{alert}</p>}
        {user && (
          <div>
            <p>
              Hello, {user.firstname}, thanks for registering. This is
              your data:
            </p>
            <div>
              <p>UserID: {user.id}</p>
              <p>Username: {user.nickname}</p>
              <p>Email: {user.email}</p>
              <p>Name: {user.firstname}</p>
              <p>Surname: {user.lastname}</p>
              <p>Password: {user.password}</p>
            </div>
          </div>
        )}
      </section>
    </section>
  );
}
