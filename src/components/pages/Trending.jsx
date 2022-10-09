import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Trending(props) {
  
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

