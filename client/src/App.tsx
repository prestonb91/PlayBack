import { useState, useEffect } from 'react'
import Login from "./components/Login";
// import SignUp from "./components/SignUp";
// import CardGrid from "./components/CardGrid";
import './App.css'

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const [loginView, setLoginView] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");

  // const checkSession = async () => {

  //   const response = await fetch(`${apiUrl}/sessions`, {
  //     credentials: "include",
  //   });

  //   const { userName } = await response.json();

  //   if (userName) {
  //     setUserName(userName);
  //   } else setPage("Login")

  // }

  // useEffect(() => {
  //   checkSession()
  // }, []);

  // useEffect(() => {
  //   if (userName) setPage("Homepage");
  // }, [userName]);


  return (
    <>

      <Login />

      {(loginView) ? (
        <>
          <Login 
            username={setUsername}
            loginView={setLoginView}
          />
        </>
      ) : (

        <>
          <h1>{"PlayBack"}</h1>
          <p>{`Welcome ${username}`}</p>
          {/* <CardGrid/> */}
        </>

      )};

    </>
  )
}

export default App
