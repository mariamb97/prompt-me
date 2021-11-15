import React, {useState } from 'react';


export default function AddUser() {

  let [ alert, setAlert ] = useState( null );
  let [ user, setUser ] = useState( null );
  let [ nickname, setNickname ] = useState( "" );
  let [ firstname, setFirstname ] = useState( "" );
  let [lastname, setLastname] = useState("");
  let [ password, setPassword ] = useState( "" );

  const handleChangeNickname = (e) => setNickname( e.target.value );
  const handleChangeFirstname = (e) => setFirstname(e.target.value);
  const handleChangeLastname = (e) => setLastname(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    addUser();
  }

  const addUser = async () => {
    if (nickname && firstname && lastname && password) {
      try {
        const res = await fetch("/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify( {
            user_nickname: nickname,
            user_firstname: firstname,
            user_lastname: lastname,
            user_password: password,
          }), 
        });

        setNickname("");
        setFirstname( "" );
        setLastname("");
        setPassword( "" );
        setAlert("");
       
        const user = await res.json();
        setUser( user[0]);
        console.log( user );
      } catch ( err ) {
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
              <label htmlFor="input_firstname">Name</label>
              <input
                id="input_firstname"
                name="input_firstname"
                value={firstname}
                onChange={(e) => handleChangeFirstname(e)}
              />
            </div>

            <div>
              <label htmlFor="input_lastname">Surnames</label>
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
                Hello, {user.user_firstname}, thanks for registering. This is
                your data:
              </p>
              <div>
                <p>UserID: {user.user_id}</p>
                <p>Username: { user.user_nickname }</p>
                
                <p>Password: {user.user_password}</p>
              </div>
            </div>
          )}
        </section>
      </section>
    );
}
