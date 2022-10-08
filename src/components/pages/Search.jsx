import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import NewPost from "./NewPost"

export default function Search (props) {
    
    const [tracks, setTracks] = useState()
    const [errorMessage, setErrorMessage] = useState()
    const [inputValue, setInputValue] = useState('')

    const test= props.trackList

    



const handleSubmit = async e => {
    e.preventDefault()
    try {
        // setting the URL to search track 
        const url = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${inputValue}&api_key=${process.env.REACT_APP_API_KEY}&format=json`

        // setting the search result as a constant
        const response = await axios.get(url)
        console.log(response.data.results.trackmatches)
        props.setApiResponse(response.data.results.trackmatches.track)
        setInputValue('')
    } catch(err) {
        console.warn(err)
        if (err.response) {
            setErrorMessage(err.response.data.message)
    }
}
}

    return (
        <div>
            <h1>Search songs!</h1>
daskld;jksakld;jaslk;djask;lfjsd;l
            <form onSubmit={handleSubmit}>
                <label htmlFor="input">Search:</label>
                <input 
                    type='text'
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />

                <button type='submit'>Search</button>
            </form>
            {console.log(props)}
            {props.trackList}
        </div>
    )
}