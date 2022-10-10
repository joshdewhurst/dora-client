import { useState } from "react"
import { Link } from "react-router-dom"

export default function Trending(props) {
    const [mediaToSend, setMediaToSend] = useState('')
    
  
    const topTracks = props.trending.map((track, i) => {
        return(
            <div key={`track${i}`} className='w-2/3 text-3xl flex justify-around p-4 mx-auto'>
                    <div className="w-2/5 text-right">
                        {track.name}
                    </div>
                        -
                    <div className="w-2/5 text-left flex justify-between">
                        <p> {track.artist.name}</p>
                        <Link className="text-sm text-blue-900" to={`../media/${track.name}/${track.artist.name}`}>Details</Link>
                        
                    </div>
            </div>
        )
    })
    return(
        <div className="mb-10">
            <h1 className="text-5xl font-bold p-5">Top 50 Trending Songs</h1>
            <div>
                <h4>{topTracks}</h4>
            </div>
        </div>
    )
}

