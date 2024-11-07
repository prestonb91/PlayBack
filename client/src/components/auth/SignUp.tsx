import React from "react";
import axios from "axios";
import { useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

// TODO: Add sign up error handling

interface Props {
    setPageView: (value: string) => void;
}

const SignUp: React.FC<Props> = ( { setPageView }) => {
    const [newUser, setNewUser] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleSignUp = async (e : React.MouseEvent<HTMLButtonElement>) => {
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
            <form className="text-white border-2 border-green-500 w-1/5 h-80 p-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-60">
                <div className="text-center mb-5">SignUp Page</div>
                <label
                    className="text-white"
                >Username: </label>
                    <input  
                        className="text-black w-full mb-2"
                        type="text"
                        name="username"
                        value={newUser}
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => setNewUser(e.target.value)}
                        >
                </input>
                <label
                    className="text-white"
                >Password: </label>
                <input
                    className="text-black mb-5 w-full"
                    type="password"
                    name="password"
                    value={newPassword}
                    onChange={(e : React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                >
                </input>
                <button
                    className="text-green-500 border w-full p-2 mb-2"
                    type="button"
                    onClick={handleSignUp}
                >
                    SignUp
                </button>
                <button
                    className="text-white border w-full p-2"
                    type="button"
                    onClick={()=>setPageView("login")}
                >
                    Return
                </button>
            </form>
        </>
    )

}

export default SignUp;