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
import Post from './components/pages/Post'
import Posts from './components/pages/Posts'
import axios from 'axios'


function App() {
  // the currently logged in user will be stored up here in state
  const [currentUser, setCurrentUser] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const [errorMessage, setErrorMessage] = useState()
  const [apiResponse, setApiResponse] = useState([])
  const [artistApiResponse, setArtistApiResponse] = useState([])
  const [search, setSearch] = useState("")
  const [artist, setArtist] = useState("")
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
    const artistSearch = async () => {
      try {
        const artistUrl = `http://ws.audioscrobbler.com//2.0/?method=artist.search&artist=${artist}&api_key=${process.env.REACT_APP_API_KEY}&format=json`
        const artistResponse = await axios.get(artistUrl)
        setArtistApiResponse(artistResponse.data.results.artistmatches.artist)
      } catch(err) {
        console.warn(err)
        if (err.response) {
            setErrorMessage(err.response.data.message)
      }
      }   
    }
    artistSearch()
  }, [artist])

  useEffect(() => {
    const getTrending = async (e) => {

        try {
            const trendingUrl = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${process.env.REACT_APP_API_KEY}&format=json`
            const response = await axios.get(trendingUrl)
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
            element={<Welcome apiResponse={apiResponse} setApiResponse={setApiResponse} artistApiResponse={artistApiResponse} setArtistApiResponse={setArtistApiResponse} setInputValue={setInputValue} setSearch={setSearch} setArtist={setArtist}/>}
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
            element={currentUser ? <Profile handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} 
            apiResponse={apiResponse} setApiResponse={setApiResponse} artistApiResponse={artistApiResponse} setArtistApiResponse={setArtistApiResponse} setInputValue={setInputValue} search={search} setSearch={setSearch} setArtist={setArtist}/> : <Navigate to="/login" />}
          />

          <Route 
            path='/search'
            element={currentUser ? <Search handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} apiResponse={apiResponse} setApiResponse={setApiResponse} 
            artistApiResponse={artistApiResponse} setArtistApiResponse={setArtistApiResponse} inputValue={inputValue} setInputValue={setInputValue} setSearch={setSearch} setTrack={setTrack} setArtist={setArtist}/> : 
            // rendering a loading page for the time a currentUser is: null
            <Loading />}
            />

          <Route 
            path='/post'
            element={currentUser ? <Posts handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} 
            apiResponse={apiResponse} setApiResponse={setApiResponse} artistApiResponse={artistApiResponse} setArtistApiResponse={setArtistApiResponse} setInputValue={setInputValue} setSearch={setSearch} setArtist={setArtist}/> : <Loading />}
            />

          <Route 
            path='/post/:id'
            element={currentUser ? <Post handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} 
            apiResponse={apiResponse} setApiResponse={setApiResponse} artistApiResponse={artistApiResponse} setArtistApiResponse={setArtistApiResponse} setInputValue={setInputValue} setSearch={setSearch} setArtist={setArtist}/> : <Loading />}
            />

          <Route 
            path='/post/:id/edit'
            element={currentUser ? <EditPost handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} 
            apiResponse={apiResponse} setApiResponse={setApiResponse} artistApiResponse={artistApiResponse} setArtistApiResponse={setArtistApiResponse} setInputValue={setInputValue} setSearch={setSearch} setArtist={setArtist}/> : <Loading />}
            />

          <Route 
            path='/home'
            element={currentUser ? <Home handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} apiResponse={apiResponse} setApiResponse={setApiResponse} artistApiResponse={artistApiResponse} setArtistApiResponse={setArtistApiResponse} setInputValue={setInputValue} setSearch={setSearch} setArtist={setArtist}/> : <Loading />}
            />

          <Route 
          // will need to change path later
            path='/media/:name/:artist'
            element={currentUser ? <Media handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} /> : <Loading />}
            />
          

          <Route 
            path='/post/new'

            element={currentUser ? <NewPost handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} apiResponse={apiResponse} setApiResponse={setApiResponse} artistApiResponse={artistApiResponse} setArtistApiResponse={setArtistApiResponse} setInputValue={setInputValue} track={track} setSearch={setSearch} setArtist={setArtist}/> : <Loading />}

            />

          <Route 
            path='/trending'
            element={currentUser ? <Trending handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} trending={trending} apiResponse={apiResponse} setApiResponse={setApiResponse} artistApiResponse={artistApiResponse} setArtistApiResponse={setArtistApiResponse} setInputValue={setInputValue} setSearch={setSearch} setArtist={setArtist}/> : <Loading />}
            />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
