import { useState, useEffect } from 'react'
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Logout from "./components/auth/Logout";
import CardGrid from "./components/CardGrid";
import NewsTickerWidget from "./components/widgets/NewsTickerWidget";
import axios from 'axios';

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
        <div>
          <div>
            <Logout 
              handleLogout={handleLogout}
            />
          </div>
          <div className="text-center">{"PlayBack"}</div>
          <div>{`Welcome ${username}`}</div>
          <CardGrid
            userId={userId}
          />
          <div className="border-2 w-1/5 right-0 top-36 absolute h-max-screen overflow-y-scroll">
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
