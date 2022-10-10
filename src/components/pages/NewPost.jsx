import { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function NewPost (props) {
    const [form, setForm] = useState({
        title: props.track.track.name,
        artist: props.track.track.artist,
        rating: 0,
        blurb: "",
        user: props.currentUser.id
    })

    localStorage.setItem("title", form.title)
    const songTitle = localStorage.getItem("title")
   
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/post/new`, form)
            console.log("posted")
            navigate("/home")
        } catch(err) {
        console.warn(err)
        if (err.response) {
            setErrorMessage(err.response.data.message)
            }
        }
    }
    
    return (
        <div>
            {/* need to add submit button and handler */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="songTitle">Song Title:</label>
                    <input type="text" 
                        id="songTitle" 
                        value={`${props.track.track.name}`} 
                        readOnly>
                    </input>
                    <br></br>
                    <label htmlFor="songArtist">Artist:</label>
                    <input type="text" 
                        id="songArtist" 
                        value={`${props.track.track.artist}`} 
                        readOnly>
                    </input>
                    <br></br>
                    <label htmlFor="songRating">Rating:</label>
                    <input type="number" 
                        id="songRating" 
                        min="0" 
                        max="10"
                        onChange={(e) => setForm({...form, rating: e.target.value})}>
                    </input>
                    <br></br>
                    <label htmlFor="songBlurb">Blurb:</label>
                    <input type="text" 
                        id="blurb"
                        onChange={(e) => setForm({...form, blurb: e.target.value})}>
                    </input>
                </div>
                <button type="submit">Post Song!</button>
            </form>
        </div>
        
    )
}
