import { useState, useEffect } from "react"
import { useNavigate, useParams, Link, Navigate } from "react-router-dom"
import axios from "axios"

export default function EditPost (props) {
    const [form, setForm] = useState({})
    const [errorMessage, setErrorMessage] = useState("")
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/post/${id}`)
                console.log(response.data)
                setForm(response.data)
            } catch(err) {
            console.warn(err)
            if (err.response) {
                setErrorMessage(err.response.data.message)
            }
            }
        }
        getPost()
    }, [id])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/post/${id}`, form)
            navigate(`/post`)
        } catch(err) {
            console.warn(err)
            if (err.response) {
                setErrorMessage(err.response.data.message)
            }
        }
    }
    return (
        <div>
            <h1>Edit Post</h1>
            <p>{errorMessage}</p>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="songTitle">Song Title:</label>
                    <input type="text"
                           id="songTitle"
                           value={`${form.title}`}
                           onChange={(e) => setForm({...form, title: e.target.value})}>
                    </input>
                    <br></br>
                    <label htmlFor="songArtist">Artist:</label>
                    <input type="text"
                           id="songArtist"
                           value={`${form.artist}`}
                           onChange={(e) => setForm({...form, artist: e.target.value})}>
                    </input>
                    <br></br>
                    <label htmlFor="songRating">Rating:</label>
                    <input type="number"
                           id="songRating"
                           min="0"
                           max="10"
                           value={`${form.rating}`}
                           onChange={(e) => setForm({...form, rating: e.target.value})}>
                    </input>
                    <br></br>
                    <label htmlFor="songBlurb">Blurb:</label>
                        <input type="text"
                               id="songBlurb"
                               value={`${form.blurb}`}
                               onChange={(e) => setForm({...form, blurb: e.target.value})}>
                        </input>
                </div>
                <button type="submit">Edit Post!</button>
            </form>
        
        </div>
    )
}