import { useState, useEffect } from "react"
import { useNavigate, useParams, Link, Navigate } from "react-router-dom"
import axios from "axios"

export default function EditPost (props) {
    const [form, setForm] = useState({})
    const [errorMessage, setErrorMessage] = useState("")
    const { id } = useParams()
    const navigate = useNavigate()
    const [search, setSearch] = useState()

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/post/${id}`, options)
                // console.log(response.data)
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
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/post/${id}`, form, options)
            navigate(`/post/${id}`)
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

    return (
        <div className="bg-blue-100 h-screen">
            <div class="flex-col w-1/2 mx-auto">
                <h1 className="text-5xl font-bold">Edit Post</h1>
                <p>{errorMessage}</p>
                
                <form onSubmit={handleSubmit}>
                    <div >
                    {/* <input 
                                className='formInputs'
                                type='text'
                                name={`${form.title}`}
                                value={props.inputValue}
                                onChange={e => props.setInputValue(e.target.value)}
                                placeholder="Want to change your song?"
                    /> */}
                            {/* <button className='ml-2 p-3 bg-blue-600 rounded-md' type='submit' onClick={handleSearch}>SEARCH</button>
                            <select
                            value={`${form.title}`}
                            onChange={(e) => setForm({...form, title: e.target.value})}
                            required
                            >
                                {trackList}
                            </select> */}
                        <br></br>
                        <label htmlFor="songTitle" className="text-2xl font-bold">Track:</label>
                        <input type="text"
                            value={`${form.title}`}
                            onChange={(e) => setForm({...form, title: e.target.value})}
                            class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                invalid:border-pink-500 invalid:text-pink-600
                                focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                                " />
                        <label htmlFor="songArtist" className="text-2xl font-bold">Artist:</label>
                        <input type="text"
                            id="songArtist"
                            name="newArtist"
                            value={`${form.artist}`}
                            onChange={(e) => setForm({...form, artist: e.target.value})}
                            class="formInputs">
                        </input>
                        <br></br>
                        <label htmlFor="songRating" className="text-2xl font-bold">Rating:</label>
                        <input type="number"
                            id="songRating"
                            min="0"
                            max="10"
                            value={`${form.rating}`}
                            onChange={(e) => setForm({...form, rating: e.target.value})}
                            class="formInputs
                                ">
                        </input>
                        <br></br>
                        <label htmlFor="songBlurb" className="text-2xl font-bold">Blurb:</label>
                            <textarea type="text"
                                id="songBlurb"
                                value={`${form.blurb}`}
                                onChange={(e) => setForm({...form, blurb: e.target.value})}
                                cols="100" 
                                rows="5" 
                                class="formInputs">
                            </textarea>
                    </div>
                    <br></br>
                    <button type="submit" class="ml-2 p-3 bg-blue-600 rounded-md">Save Post!</button>
                </form>
            
            </div>
        </div>
    )
}
