import React, {useState} from 'react';
import { Link } from "react-router-dom";

export default function User() {
  let [ alert, setAlert ] = useState( null );
  let [ user, setUser ] = useState(null);
  let [ userId, setUserId ] = useState( "" );

  const handleInputUserId = ( e ) => {
    setUserId( e.target.value );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert(null)
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
      setAlert( err );
    }
  }

  // FAILED ATTEMPT AT DELETING USERS

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
      <h1>User section</h1>
      <section className="user__wrap">
        <article>
          <h3>Log In</h3>
          <div>
            <form className="user__login" onSubmit={(e) => handleSubmit(e)}>
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
              <p>User ID: {user.user_id}</p>
              <p>Username: {user.user_nickname}</p>
              <p>Name: {user.user_firstname}</p>
              <p>Surname: {user.user_lastname}</p>
              <p>Password: {user.user_password}</p>
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
