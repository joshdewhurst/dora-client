import { useEffect, useState } from "react"

export default function Trending(props) {
    const [errorMessage, setErrorMessage] = useState("")
    useEffect(() => {
        try {
            props.setApiResponse([])
            props.setArtistApiResponse([])
            props.setInputValue("")
            props.setArtistInputValue("")
            props.setSearch("")
            props.setArtist("")
        }catch (err) {
            console.warn(err)
            if (err.response) {
                setErrorMessage(err.response.data.message)
            }
        }
    }, [])
  
    const topTracks = props.trending.map((track, i) => {
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

