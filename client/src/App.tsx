import { useState, useEffect } from 'react'
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Logout from "./components/auth/Logout";
import CardGrid from "./components/CardGrid";
import NewsTickerWidget from "./components/widgets/NewsTickerWidget";
import axios from 'axios';
import "./App.css"

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const [pageView, setPageView] = useState<any>("login");
  const [userId, setUserId] = useState<any>(null);
  const [username, setUsername] = useState<any>("");

  const handleLogout = async () => {
    try {
      await axios.post(`${apiUrl}/logout`, {}, { withCredentials: true});
      setPageView("login");
    } catch (err) {
      console.error("Logout error: ", err)
    }
  }

  const checkLoggedIn = async () => {
    const response = await axios.get(`${apiUrl}/sessions`, {
      withCredentials: true,
    })
    if (response.status === 200) {
      setUserId(response.data.user_id)
      setUsername(response.data.username)
      setPageView("homepage")
    } else {
      console.error("User not logged in")
    }
  }

  useEffect(()=>{
    checkLoggedIn();
  }, [])

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
        <div className="text-white">
          <div className="border-2 absolute right-7 top-3 p-2 bg-gray-300 text-gray-800 border-gray-600">
            <Logout 
              handleLogout={handleLogout}
            />
          </div>
          <div className="text-center p-2 text-6xl mt-3">{"PlayBack"}</div>
          <img 
            className="absolute top-0 left-96 h-36"
          src="https://pixeljoint.com/files/icons/full/torch__r13431715481.gif"></img>
          <img 
            className="absolute top-0 right-96 h-36"
          src="https://pixeljoint.com/files/icons/full/torch__r13431715481.gif"></img>
          <div className="text-center p-2">{`Welcome to ${username}'s library`}</div>
          <div>
            <CardGrid
              userId={userId}
            />
          </div>
          <div className="border-l-4 border-dashed p-2 w-1/5 absolute right-0 top-40 h-max-screen overflow-y-scroll flex-auto border-green-500">
            <NewsTickerWidget/>
          </div>
        </div>
      ) : (
        null
      )}
    </>
  )
}

export default App
