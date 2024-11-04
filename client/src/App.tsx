import { useState, useEffect } from 'react'
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Logout from "./components/Logout";
import CardGrid from "./components/CardGrid";
import CreateCard from "./components/CreateCard";
import NewsWidget from "./components/NewsWidget";
import './App.css'
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const [pageView, setPageView] = useState<any>("login");
  const [username, setUsername] = useState<any>("");
  const [userId, setUserId] = useState<any>(null);

  // handle logout prop sent to logout
  const handleLogout = async () => {
    try {
      await axios.post(`${apiUrl}/logout`, {}, { withCredentials: true});
      setPageView("login");
    } catch (err) {
      console.error("Logout error: ", err)
    }
  }

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
  //   if (userId) setPageView("Homepage");
  // }, [userId]);


  return (
    <>
      {pageView === "login" ? (
        <>
          <Login 
            setUsername={setUsername}
            setUserId={setUserId}
            setPageView={setPageView}
          />
          <button
            onClick={()=>setPageView("signup")}
          >
            SignUp
          </button>
        </>
      ) : pageView === "signup" ? (
        <>
          <SignUp
            setPageView={setPageView}
          />
        </>
      ) : pageView === "homepage" ? (
        <>
          <Logout 
            handleLogout={handleLogout}
          />
          <h1>{"PlayBack"}</h1>
          <p>{`Welcome ${username}`}</p>
          <p>{`UserId: ${userId}`}</p>
          <CreateCard
            userId={userId}
          />
          <CardGrid
            userId={userId}
          />
          <NewsWidget/>
        </>
      ) : (
        null
      )}
    </>
  )
}

export default App
