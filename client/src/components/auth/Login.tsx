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

    // Set focus on first input when component loads
    useEffect(() => {
        inputUsername.current.focus();
    }, []);

    // Reset any error messages when user is typing user or password
    useEffect(() => {
        setErrorMessage("");
    }, [loginUser, loginPassword]);

    // calls handleSubmit on function of login form
    const handleLoginClick = async (e : any) => {
        // Prevents default behavior form which is reload page
        e.preventDefault();
        // Post request to submit login information
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
            <div>Login Page</div>
            <div className="flex">
                <div className="text-red-500">{errorMessage}</div>
                <form className="border-2 w-1/4 h-48 p-5">
                    <label className="text-white">Username:</label>
                        <input
                            className="text-black mb-2"
                            type="text"
                            id="username"
                            ref={inputUsername}
                            value={loginUser}
                            onChange={(e : any) => setLoginUser(e.target.value)}
                        >
                        </input>
                    <label className="text-white">Password:</label>
                        <input
                            className="text-black"
                            type="password"
                            id="password"
                            ref={inputPassword}
                            value={loginPassword}
                            onChange={(e : any) => setLoginPassword(e.target.value)}
                            >
                        </input>
                    <button
                        className="border text-white m-2"
                        type="button"
                        onClick={handleLoginClick}
                    >
                        Login
                    </button>
                </form>
            </div>
        </>
    )
}

export default Login;