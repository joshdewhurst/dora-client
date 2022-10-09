import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link
} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './components/pages/Login'
import Profile from './components/pages/Profile'
import Register from './components/pages/Register'
import Welcome from './components/pages/Welcome'
import Navbar from './components/Navbar'
import './App.css'
import jwt_decode from 'jwt-decode'

// importing pages
import Search from './components/pages/Search'
import EditPost from './components/pages/EditPost'
import Home from './components/pages/Home'
import NewPost from './components/pages/NewPost'
import Media from './components/pages/Media'
import Loading from './components/pages/Loading'
import Trending from './components/pages/Trending'
import axios from 'axios'


function App() {
  // the currently logged in user will be stored up here in state
  const [currentUser, setCurrentUser] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const [errorMessage, setErrorMessage] = useState()
  const [apiResponse, setApiResponse] = useState([])
  const [search, setSearch] = useState("")
  const [trending, setTrending] = useState([])
  const [track, setTrack] = useState({})

  // useEffect -- if the user navigates away form the page, we will log them back in
  useEffect(() => {
    // check to see if token is in storage
    const token = localStorage.getItem('jwt')
    if (token) {
      // if so, we will decode it and set the user in app state
      setCurrentUser(jwt_decode(token))
    } else {
      setCurrentUser(null)
    }
  }, []) // happen only once

  // event handler to log the user out when needed
  const handleLogout = () => {
    // check to see if a token exists in local storage
    if (localStorage.getItem('jwt')) {
      // if so, delete it
      localStorage.removeItem('jwt')
      // set the user in the App state to be null
      setCurrentUser(null)
    }
  }

  useEffect(() => {
      const trackSearch = async () => {
        try {
          const trackSearchUrl =  `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${search}&api_key=${process.env.REACT_APP_API_KEY}&format=json`
          console.log(trackSearchUrl)
          const trackResponse = await axios.get(trackSearchUrl)
          setApiResponse(trackResponse.data.results.trackmatches.track)
        } catch(err) {
          console.warn(err)
          if (err.response) {
              setErrorMessage(err.response.data.message)
        }
      }
    }
    trackSearch()
  }, [search])

  useEffect(() => {
    const getTrending = async (e) => {

        try {
            const trendingUrl = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${process.env.REACT_APP_API_KEY}&format=json`
            const response = await axios.get(trendingUrl)
            console.log(response.data.tracks.track)
            setTrending(response.data.tracks.track)
        } catch(err) {
            console.warn(err)
                if (err.response) {
                    setErrorMessage(err.response.data.message)
            }
        }
       
    }
    getTrending()
   }, [])

  return (
    <Router>
      <header>
        <Navbar 
          currentUser={currentUser}
          handleLogout={handleLogout}
        />
      </header>

      <div className="App">
        <Routes>
          <Route 
            path="/"
            element={<Welcome />}
          />

          <Route 
            path="/register"
            element={<Register currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          <Route 
            path="/login"
            element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          {/* conditionally render auth locked routes */}
          <Route 
            path="/profile"
            element={currentUser ? <Profile handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} /> : <Navigate to="/login" />}
          />

          <Route 
            path='/search'
            element={currentUser ? <Search handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} apiResponse={apiResponse} setApiResponse={setApiResponse} inputValue={inputValue} setInputValue={setInputValue} setSearch={setSearch} setTrack={setTrack}/> : 
            // rendering a loading page for the time a currentUser is: null
            <Loading />}
            />

          <Route 
            path='/post/edit'
            element={currentUser ? <EditPost handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} /> : <Loading />}
            />

          <Route 
            path='/home'
            element={currentUser ? <Home handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} /> : <Loading />}
            />

          <Route 
          // will need to change path later
            path='/media'
            element={currentUser ? <Media handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} /> : <Loading />}
            />

          <Route 
            path='/post/new'
            element={currentUser ? <NewPost handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} apiResponse={apiResponse} setApiResponse={setApiResponse} track={track}/> : <Loading />}
            />

          <Route 
            path='/trending'
            element={currentUser ? <Trending handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} trending={trending}/> : <Loading />}
            />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
