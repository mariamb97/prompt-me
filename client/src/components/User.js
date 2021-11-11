import React, {useState} from 'react';
import { Link } from "react-router-dom";



export default function User() {
  let [ error, setError ] = useState( null );
  let [ user, setUser ] = useState( [] );
  let [ userId, setUserId ] = useState( "" );

  const handleInputUserId = (e) => setUserId(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    getUser();
  }

  const getUser = async (e) => {
    try {
      const res = await fetch( `users/${ userId }`, {} );
      const user = await res.json();
      setUser( user );
      console.log( user );

    } catch ( err ) {
      console.log( err );
      setError( err );
    }
  }

  return (
    <section id="user">
      <h1>User section</h1>
      <section id="user_actions">
        <article>
          <h3>Log In</h3>
          <div id="user_login">
            <form onSubmit={(e) => handleSubmit(e)}>
              <label htmlFor="user_id">User ID</label>
              <input
                id="user_id"
                type="number"
                value={userId}
                onChange={(e) => handleInputUserId(e)}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </article>
        <article>
          <h3>Sign Up</h3>
          <div>
            <Link to="/register">Register</Link>
          </div>
        </article>
      </section>
      <section id="user_info">
        {user &&
          <article>
            <p>This is your information: </p>
            <div>
              <p>User ID: {user.user_id}</p>
              <p>Username: {user.user_nickname}</p>
              <p>Name: {user.user_firstname}</p>
              <p>Surname: {user.user_lastname}</p>
              <p>Password: {user.user_password}</p>
            </div>
          </article>
        }
      </section>
    </section>
  );
}
