import axios from "axios";
import React from "react";
import { useState, useRef, useEffect } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

const Login: React.FC = ( {setUserName, setLoginView} : any) => {
    const inputUsername : any = useRef();
    const inputPassword : any = useRef();

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // set focus on first input when component loads
    useEffect(() => {
        inputUsername.current.focus();
    }, []);

    // reset any error messages when user is typing user or password
    useEffect(() => {
        setErrorMessage("");
    }, [user, password]);

    // calls handleSubmit on function of login form
    const handleLoginClick = async (e : any) => {
        // prevents default behavior form which is reload page
        e.preventDefault();

        // post request to submit login information
        console.log(user, password);
        try {
                const response = await axios.post(`${apiUrl}/login`, {
                    username: user, password: password,
                },
                { withCredentials: true }
            );

            console.log(response.data);
            
        } catch (err : any) {
            // setErrorMessage("Unable to log in")
            console.error(err)
        }
    }

    return (
        <>
            <h2>Login Page</h2>
                <p>{errorMessage}</p>
                <form>
                    <label>Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={inputUsername}
                            onChange={(e : any) => setUser(e.target.value)}
                            value={user}
                        >
                        </input>
                    <label>Password:</label>
                        <input
                            type="password"
                            id="password"
                            ref={inputPassword}
                            onChange={(e : any) => setPassword(e.target.value)}
                            value={password}
                            >
                        </input>
                    <button
                        type="button"
                        onClick={handleLoginClick}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                    >
                        Sign Up
                    </button>
                </form>

        </>

    )

}

export default Login;