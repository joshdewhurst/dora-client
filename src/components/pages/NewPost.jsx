

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

    // clears state so that search results are cleared when you navigate to different pages on the navbar
    // useEffect(() => {
    //     try {
    //         props.setApiResponse([])
    //         props.setArtistApiResponse([])
    //         props.setInputValue("")
    //         props.setSearch("")
    //         props.setArtist("")
    //     }catch (err) {
    //         console.warn(err)
    //         if (err.response) {
    //             setErrorMessage(err.response.data.message)
    //         }
    //     }
    // }, [])
    

    useEffect(()=> {
        try {
            if(type === 'track') {
                setForm({title: props.track.track.name, artist: props.track.track.artist, user: props.currentUser.id, username: props.currentUser.username }) 
            }
            if(type === 'artist') {
                setForm({title: null, artist: props.artist.artist.name, user: props.currentUser.id, username: props.currentUser.username})
            }
            if(type === 'direct') {
                setForm({user: props.currentUser.id, username: props.currentUser.username})
            }
        } catch (err) {
            console.warn(err)
        }
        
    },[props.setArtist, props.setTrack])

    const options = {
		headers: {
			'authorization': localStorage.getItem('jwt'),
			'Accept' : 'application/json',
			'Content-Type': 'application/json'
		}
	}
    
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/post/new`, form, options)
            // console.log("posted")
            navigate("/home")
        } catch(err) {
        console.warn(err)
        if (err.response) {
            setErrorMessage(err.response.data.message)
            }
        }
    }

    const trackForm =
            (
            <form onSubmit={handleSubmit}>
                <div >
                    <label htmlFor="songTitle" className="text-2xl font-bold">Song Title:</label>
                    <input type="text" 
                        id="songTitle" 
                        value={`${type === 'track'? form.title : null}`} 
                        onChange={(e) => setForm({...form, title: e.target.value})}
                        className='formInputs'>
                    </input>
                    <br></br>
                    <label htmlFor="songArtist" className="text-2xl font-bold">Artist:</label>
                    <input type="text" 
                        id="songArtist" 
                        value={`${type === 'track'? form.artist : null}`} 
                        onChange={(e) => setForm({...form, artist: e.target.value})}
                        className="formInputs">
                    </input>
                    <br></br>
                    <label htmlFor="songRating" className="text-2xl font-bold">Rating:</label>
                    <input type="number" 
                        id="songRating" 
                        min="0" 
                        max="10"
                        onChange={(e) => setForm({...form, rating: e.target.value})}
                        placeholder="Rate the song 1-10"
                        className="formInputs">
                    </input>
                    <br></br>
                    <label htmlFor="songBlurb" className="text-2xl font-bold">Blurb:</label>
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
                    <label htmlFor="songTitle" className="text-2xl font-bold">Song Title:</label>
                    <input type="text" 
                        id="songTitle"  
                        className='formInputs'
                        onChange={(e) => setForm({...form, title: e.target.value})}
                    />
                    <br></br>
                    <label htmlFor="songArtist" className="text-2xl font-bold">Artist:</label>
                    <input type="text" 
                        id="songArtist" 
                        className="formInputs"
                        onChange={(e) => setForm({...form, artist: e.target.value})}
                    />
                    <br></br>
                    <label htmlFor="songRating" className="text-2xl font-bold">Rating:</label>
                    <input type="number" 
                        id="songRating" 
                        min="0" 
                        max="10"
                        onChange={(e) => setForm({...form, rating: e.target.value})}
                        placeholder="Rate the song 1-10"
                        className="formInputs">
                    </input>
                    <br></br>
                    <label htmlFor="songBlurb" className="text-2xl font-bold">Blurb:</label>
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
                <label htmlFor="songArtist" className="text-2xl font-bold">Artist:</label>
                <input type="text" 
                    id="songArtist" 
                    value={`${type === 'artist'? form.artist : ''}`} 
                    className="formInputs">
                </input>
                <br></br>
                <label htmlFor="songRating" className="text-2xl font-bold">Rating:</label>
                <input type="number" 
                    id="songRating" 
                    min="0" 
                    max="10"
                    onChange={(e) => setForm({...form, rating: e.target.value})}
                    placeholder="Rate the Artist 1-10"
                    className="formInputs">
                </input>
                <br></br>
                <label htmlFor="songBlurb" className="text-2xl font-bold">Blurb:</label>
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
        <div class="bg-blue-100 h-screen">

            <div className="flex-col w-1/2 mx-auto">
                {type === 'track'? trackForm : type === 'artist'? albumForm : blankForm}
            </div>
    
        </div>
        
    )

}