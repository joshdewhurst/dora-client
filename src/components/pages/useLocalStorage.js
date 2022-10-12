import { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"


export default function NewPost (props) {
    const [form, setForm] = useState({
        title: '',
        artist: '',
        rating: 0,
        blurb: "",
        user: props.currentUser.id
    })
    const [showForm, setShowForm] = useState('')
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()
    const { type } = useParams()
    const [search, setSearch] = useState()

    // clears state so that search results are cleared when you navigate to different pages on the navbar
    useEffect(() => {
        try {
            props.setApiResponse([])
            props.setArtistApiResponse([])
            props.setInputValue("")
            props.setSearch("")
            props.setArtist("")
        }catch (err) {
            console.warn(err)
            if (err.response) {
                setErrorMessage(err.response.data.message)
            }
        }
    }, [])
    

    const [song, setSong] = useState(()=> {
        const saved = localStorage.getItem("song")
        const initialValue = JSON.parse(saved)
        return initialValue || ""
    })

    const [artist, setArtist] = useState(()=> {
        const saved = localStorage.getItem("artist")
        const initialValue = JSON.parse(saved)
        return initialValue || ""
    })

    useEffect(() => {
            // storing input name
            const storeSong = () => {
                    setSong(localStorage.getItem("song"))
                }
            
            const storeArtist = () => {
                    setArtist(localStorage.getItem("artist"))
                }
            localStorage.setItem("song", JSON.stringify(song))
            localStorage.setItem("artist", JSON.stringify(artist))
            storeSong()
            storeArtist()

        }, [song, artist]);
        
    console.log(window.performance.getEntriesByType("navigation")[0].type)

    useEffect(()=> {
        try {
            if (window.performance.getEntriesByType("navigation")[0].type === "navigate") {
                if(type === 'track') {
                    setForm({title: props.track.track.name, artist: props.track.track.artist, user: props.currentUser.id, username: props.currentUser.username }) 
                }
                if(type === 'artist') {
                    setForm({title: null, artist: props.artist.artist.name, user: props.currentUser.id, username: props.currentUser.username})
                }
                if(type === 'direct') {
                    setForm({user: props.currentUser.id, username: props.currentUser.username})
                }
            } else if (window.performance.getEntriesByType("navigation")[0].type === "reload") {
                if(type === 'track') {
                    setForm({title: props.track.track.name, artist: props.track.track.artist, user: props.currentUser.id, username: props.currentUser.username }) 
                }
                if(type === 'artist') {
                    setForm({title: null, artist: props.artist.artist.name, user: props.currentUser.id, username: props.currentUser.username})
                }
                if(type === 'direct') {
                    setForm({user: props.currentUser.id, username: props.currentUser.username})
                }
            }
            
        } catch(err) {
            console.warn(err)
            if(err.response) {
                setErrorMessage("Error refreshing the page, please return to Search to find your song again!")
            }
        }
        
    },[props.setArtist, props.setTrack])
    
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/post/new`, form)
            console.log("posted")
            navigate("/home")
        } catch(err) {
        console.warn(err)
        if (err.response) {
            setErrorMessage(err.response.data.message)
            }
        }
    }

     const trackList = props.apiResponse.map((track, i) => {   
            // if (track.name ) {
            //     form.artist = track.artist
            // }
            return (
                    <option value={track.name}>
                    {track.name} by {track.artist}
                    </option>
            )
        }) 
    
        const handleSearch = (e) => {
            e.preventDefault()
            props.setSearch(props.inputValue)
        }

    const trackForm =
            (
            <form onSubmit={handleSubmit}>
                <div >
                    <label htmlFor="songTitle">Song Title:</label>
                    <input type="text" 
                        id="songTitle" 
                        readOnly
                        value={`${type === 'track'? form.title : null}`} 
                        className='formInputs'>
                    </input>
                    <br></br>
                    <label htmlFor="songArtist">Artist:</label>
                    <input type="text" 
                        id="songArtist" 
                        readOnly
                        value={`${type === 'track'? form.artist : null}`} 
                        className="formInputs">
                    </input>
                    <br></br>
                    <label htmlFor="songRating">Rating:</label>
                    <input type="number" 
                        id="songRating" 
                        min="0" 
                        max="10"
                        onChange={(e) => setForm({...form, rating: e.target.value})}
                        placeholder="Rate the song 1-10"
                        className="formInputs">
                    </input>
                    <br></br>
                    <label htmlFor="songBlurb">Blurb:</label>
                    <textarea 
                    type='text' 
                    name="blurb" 
                    id="blurb" 
                    cols="100" 
                    rows="5" 
                    onChange={(e) => setForm({...form, blurb: e.target.value})} 
                    className="formInputs">

                    </textarea>
                </div>
                <br></br>
                <button type="submit" className="ml-2 p-3 bg-blue-600 rounded-md">Post Song!</button>
            </form>
        )

    const blankForm =
            (
            <form onSubmit={handleSubmit}>
                <div >
                <input 
                            className='formInputs'
                            type='text'
                            name={`${form.title}`}
                            value={props.inputValue}
                            onChange={e => props.setInputValue(e.target.value)}
                            placeholder="Search for a song you want to post!"
                />
                        <button className='ml-2 p-3 bg-blue-600 rounded-md' type='submit' onClick={handleSearch}>SEARCH</button>
                        <select
                        value={`${form.title}`}
                        onChange={(e) => setForm({...form, title: e.target.value})}
                        required
                        >
                            {trackList}
                        </select>
                    <br></br>
                    <label htmlFor="songArtist">Artist:</label>
                    <input type="text" 
                        id="songArtist" 
                        className="formInputs"
                        onChange={(e) => setForm({...form, artist: e.target.value})}
                    />
                    <br></br>
                    <label htmlFor="songRating">Rating:</label>
                    <input type="number" 
                        id="songRating" 
                        min="0" 
                        max="10"
                        onChange={(e) => setForm({...form, rating: e.target.value})}
                        placeholder="Rate the song 1-10"
                        className="formInputs">
                    </input>
                    <br></br>
                    <label htmlFor="songBlurb">Blurb:</label>
                    <textarea 
                    type='text' 
                    name="blurb" 
                    id="blurb" 
                    cols="100" 
                    rows="5" 
                    onChange={(e) => setForm({...form, blurb: e.target.value})} 
                    className="formInputs">

                    </textarea>
                </div>
                <br></br>
                <button type="submit" className="ml-2 p-3 bg-blue-600 rounded-md">Post Song!</button>
            </form>
        )
    
    const albumForm = (
            <form onSubmit={handleSubmit}>
            <div >
                <label htmlFor="songArtist">Artist:</label>
                <input type="text" 
                    id="songArtist" 
                    value={`${type === 'artist'? props.artist.artist.name : ''}`} 
                    className="formInputs">
                </input>
                <br></br>
                <label htmlFor="songRating">Rating:</label>
                <input type="number" 
                    id="songRating" 
                    min="0" 
                    max="10"
                    onChange={(e) => setForm({...form, rating: e.target.value})}
                    placeholder="Rate the Artist 1-10"
                    className="formInputs">
                </input>
                <br></br>
                <label htmlFor="songBlurb">Blurb:</label>
                <textarea 
                type='text' 
                name="blurb" 
                id="blurb" 
                cols="100" 
                rows="5" 
                onChange={(e) => setForm({...form, blurb: e.target.value})} 
                className="formInputs">

                </textarea>
            </div>
            <br></br>
            <button type="submit" className="ml-2 p-3 bg-blue-600 rounded-md">Post Song!</button>
        </form>

    )


     
    return (
       
        <div className="flex-col w-1/2 mx-auto">
            {type === 'track'? trackForm : type === 'artist'? albumForm : blankForm}
        </div>
        
    )

}