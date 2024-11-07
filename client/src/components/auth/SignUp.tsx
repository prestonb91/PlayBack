import React from "react";
import axios from "axios";
import { useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

// TODO: Add sign up error handling

interface Props {
    setPageView: any;
}

const SignUp: React.FC<Props> = ( { setPageView }) => {
    const [newUser, setNewUser] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleSignUp = async (e : any) => {
        e.preventDefault();
        try {
            await axios.post(`${apiUrl}/signup`, {
                username: newUser, password: newPassword,
            },
            { withCredentials: true}
        );
        // Change page view to login after successful registration
        setPageView("login");
        
        } catch (err : any) {
            console.error(err);
        }
    }

    return (
        <>
            <form className="flex justify-center m-5">
                <label
                    className="text-white"
                >Username: </label>
                    <input  
                        className="text-black"
                        type="text"
                        name="username"
                        value={newUser}
                        onChange={(e : any) => setNewUser(e.target.value)}
                        >
                </input>
                <label
                    className="text-white"
                >Password: </label>
                <input
                    type="password"
                    name="password"
                    value={newPassword}
                    onChange={(e : any) => setNewPassword(e.target.value)}
                >
                </input>
                <button
                    className="text-white border ml-5"
                    type="button"
                    onClick={handleSignUp}
                >
                    SignUp
                </button>
            </form>
        </>
    )

}

export default SignUp;