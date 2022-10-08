import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Trending() {
    const [errorMessage, setErrorMessage] = useState("")
    const [tracks, setTracks] = useState([])

   useEffect(() => {
    const getTrending = async (e) => {

        try {
            const url = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${process.env.REACT_APP_API_KEY}&format=json`
            const response = await axios.get(url)
            console.log(response.data.tracks.track)
            setTracks(response.data.tracks.track)
        } catch(err) {
            console.warn(err)
                if (err.response) {
                    setErrorMessage(err.response.data.message)
            }
        }
       
    }
    getTrending()
   }, [])

    console.log("tracks", tracks)
  
    const topTracks = tracks.map((track, i) => {
        return(
            <div key={`track${i}`}>
                <p>{track.name} by {track.artist.name}</p>
            </div>
        )
    })

    return(
        <div>
            <h1>Top 50 Trending Songs</h1>
            <h4>{topTracks}</h4>
        </div>
    )
}

