import React, { useState, useEffect } from 'react';

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
            <form >
                <label htmlFor="user-nickname">
                    Username
                    <input type="text" name="nickname" id="user-nickname" value={user.nickname} onChange={handleChangeUserInput} />
                </label>
                <label htmlFor="user-firstname">
                    First Name
                    <input type="text" name="firstname" id="user-firstname" value={user.firstname} onChange={handleChangeUserInput} />
                </label>
                <label htmlFor="user-lastname">
                    Last Name
                    <input type="text" name="lastname" id="user-lastname" value={user.lastname} onChange={handleChangeUserInput} />
                </label>
                <label htmlFor="user-email">
                    Last Name
                    <input type="text" name="email" id="user-email" value={user.email} onChange={handleChangeUserInput} />
                </label>
                <button type="sumit" onClick={(event) => handleSubmitUpdateUser(event)}>Submit</button>
            </form>
        </div>
    )
}


export default Profile
