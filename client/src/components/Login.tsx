import React from "react";
import axios from "axios";
import { useState, useRef, useEffect } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

interface Props {
    setUsername: any, 
    setPageView: any,
    setUserId: any,
}

const Login: React.FC<Props> = ( {setUsername, setUserId, setPageView }) => {
    const inputUsername : any = useRef();
    const inputPassword : any = useRef();

    const [loginUser, setLoginUser] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    // const [user, setUser] = useState<any>();

    // set focus on first input when component loads
    useEffect(() => {
        inputUsername.current.focus();
    }, []);

    // reset any error messages when user is typing user or password
    useEffect(() => {
        setErrorMessage("");
    }, [loginUser, loginPassword]);

    // calls handleSubmit on function of login form
    const handleLoginClick = async (e : any) => {
        // prevents default behavior form which is reload page
        e.preventDefault();

        // post request to submit login information
        try {
                const response = await axios.post(`${apiUrl}/login`, {
                    username: loginUser, password: loginPassword,
                },
                { withCredentials: true }
            );
            setUsername(response.data.username);
            setUserId(response.data.id)
            setPageView("homepage");
            
        } catch (err : any) {
            console.error(err.response.data.error);
            setErrorMessage(err.response.data.error);
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
                            value={loginUser}
                            onChange={(e : any) => setLoginUser(e.target.value)}
                        >
                        </input>
                    <label>Password:</label>
                        <input
                            type="password"
                            id="password"
                            ref={inputPassword}
                            value={loginPassword}
                            onChange={(e : any) => setLoginPassword(e.target.value)}
                            >
                        </input>
                    <button
                        type="button"
                        onClick={handleLoginClick}
                    >
                        Login
                    </button>
                </form>
        </>
    )
}

export default Login;