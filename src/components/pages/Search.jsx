import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import NewPost from "./NewPost"

export default function Search (props) {
    

    const trackList = props.apiResponse.map((track, i) => {
        return (
            <div key={`track${i}`}>
            <h1>{track.name}</h1>
            <h2>Artist: {track.artist}</h2>
            {/* images are rendering images of stars */}
            <img src={track.image[1]['#text']} alt={track.name} />
            {/* need to pass props down  */}
            <Link to="/post/new"><button onClick={() => props.setTrack({ track })}>Post Song!</button></Link>
    </div>
        )
    })    

    const artistList = props.artistApiResponse.map((artist, i) => {
        return (
            <div key={`artist${i}`}>
            <h1>{artist.name}</h1>
            </div>
        )
    })  
    
    

    const handleTrackSubmit = (e) => {
        e.preventDefault()
        props.setSearch(props.inputValue)
       
    }

    const handleArtistSubmit = (e) => {
        e.preventDefault()
        props.setArtist(props.artistInputValue)
      
    }

    return (
        <div>
            <h1>Search songs!</h1>

            <form onSubmit={handleTrackSubmit}>
                <label htmlFor="input">Search:</label>
                <input 
                    type='text'
                    value={props.inputValue}
                    onChange={e => props.setInputValue(e.target.value)}
                />

                <button type='submit'>Search</button>
            </form>
            {trackList}

            <h1>Search Artist</h1>
            <form onSubmit={handleArtistSubmit}>
                <label htmlFor="input">Search:</label>
                <input 
                    type='text'
                    value={props.artistInputValue}
                    onChange={e => props.setArtistInputValue(e.target.value)}
                />

                <button type='submit'>Search</button>
            </form>
            {artistList}
        </div>
    )
}