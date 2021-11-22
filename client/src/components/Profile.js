import React, { useState, useEffect } from 'react';
import "./Profile.css"

function Profile() {
    const [user, setUser] = useState({})


    useEffect(() => {
        getUser()
    }, []);


    const getUser = async () => {
        try {
            const response = await fetch("/users/user", {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            const user = await response.json();
            if (!user.message) {
                setUser(user[0]);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const updateUser = async () => {
        const { nickname, email, firstname, lastname } = user

        try {
            const response = await fetch("/users", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    nickname: nickname,
                    email: email,
                    firstname: firstname,
                    lastname: lastname,
                }),
            });
            const user = await response.json();
            if (!user.message) {
                setUser(user[0]);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleChangeUserInput = (event) => {
        const { value, name } = event.target;
        setUser((state) => ({ ...state, [name]: value }));
    }

    const handleSubmitUpdateUser = (event) => {
        event.preventDefault()
        updateUser()
    }

    return (

        <div className="main">
            <form id="form-profile-user" >
                <div>
                    <label htmlFor="profile-user-nickname-input" className="profile-user-label"> Username</label>
                    <input type="text" name="nickname" id="profile-user-nickname-input" className="profile-user-input" value={user.nickname} onChange={handleChangeUserInput} />
                </div>
                <div>
                    <label htmlFor="profile-user-firstname-input" className="profile-user-label">  First Name </label>
                    <input type="text" name="firstname" id="profile-user-firstname-input" className="profile-user-input" value={user.firstname} onChange={handleChangeUserInput} />

                </div>
                <label htmlFor="profile-user-lastname-input" className="profile-user-label">
                    Last Name
                    <input type="text" name="lastname" id="profile-user-lastname-input" className="profile-user-input" value={user.lastname} onChange={handleChangeUserInput} />
                </label>
                <label htmlFor="profile-user-email-input" className="profile-user-label">
                    Email
                    <input type="text" name="email" id="profile-user-email-input" className="profile-user-input" value={user.email} onChange={handleChangeUserInput} />
                </label>
                <button type="sumit" onClick={(event) => handleSubmitUpdateUser(event)}>Submit</button>
            </form>
        </div>
    )
}


export default Profile
