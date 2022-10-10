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
        <div class="flex-col w-1/2 mx-auto">
            {/* need to add submit button and handler */}
            <form onSubmit={handleSubmit}>
                <div >
                    <label htmlFor="songTitle">Song Title:</label>
                    <input type="text" 
                        id="songTitle" 
                        value={`${props.track.track.name}`} 
                        disabled class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    ">
                    </input>
                    <br></br>
                    <label htmlFor="songArtist">Artist:</label>
                    <input type="text" 
                        id="songArtist" 
                        value={`${props.track.track.artist}`} 
                        disabled class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    ">
                    </input>
                    <br></br>
                    <label htmlFor="songRating">Rating:</label>
                    <input type="number" 
                        id="songRating" 
                        min="0" 
                        max="10"
                        onChange={(e) => setForm({...form, rating: e.target.value})}
                        placeholder="Rate the song 1-10"
                        class="mt-1 block w-full px-3 py-2 bg-white border 
                        caret-sky-500 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-red-600
                    focus:invalid:border-pink-500 focus:invalid:ring-red-500
                    
                    ">
                    </input>
                    <br></br>
                    <label htmlFor="songBlurb">Blurb:</label>
                    <input type="text" 
                        id="blurb"
                        onChange={(e) => setForm({...form, blurb: e.target.value})}
                        class="mt-1 block w-full px-3 py-2 bg-white border caret-sky-500 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-red-600
                    focus:invalid:border-pink-500 focus:invalid:ring-red-500
                    ">
                    </input>
                </div>
                <br></br>
                <button type="submit" class="ml-2 p-3 bg-blue-600 rounded-md">Post Song!</button>
            </form>
         
        </div>
        
    )
}
