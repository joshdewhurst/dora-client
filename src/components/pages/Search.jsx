import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import NewPost from "./NewPost"

export default function Search (props) {
    

    const trackList = props.apiResponse.map((track, i) => {
        return (
            <div key={`track${i}`} className=" my-4 flex p-4">
                <div className='w-1/3 flex justify-center pr-3'>
                    <img className='rounded-full' src={track.image[1]['#text']} alt={track.name} />

                </div>
                <div className='w-2/3 bg-blue-900 p-4 rounded-r-full'>
                    <div className='w-3/4 mx-auto text-white text-left font-bold'>
                        <h1 className='uppercase'>{track.name}</h1>
                        <h2>Artist: {track.artist}</h2>
                    </div>
                    {/* images are rendering images of stars */}
                    {/* need to pass props down  */}
                    <div className='bg-blue-600 w-fit mx-auto p-2 rounded-md font-bold my-2 text-white'>
                        <Link to="/post/new"><button onClick={() => props.setTrack({ track })}>POST SONG</button></Link>
                    </div>

                </div>
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
        <div className='flex flex-row justify-around mx-auto'>
            <div className='w-1/3 mb-10 bg-slate-800'>
                {/* <h1>Search songs!</h1> */}

                <form className='bg-black mx-auto text-white p-4 font-bold' onSubmit={handleTrackSubmit}>
                    <label className='mr-2' htmlFor="input">Search Music</label>
                    <input 
                        className='text-black px-2'
                        type='text'
                        value={props.inputValue}
                        onChange={e => props.setInputValue(e.target.value)}
                    />

                    <button className='ml-2 p-3 bg-blue-600 rounded-md' type='submit'>SEARCH</button>
                </form>
                {trackList}
            </div>
            <div className='w-1/3 mb-10 bg-slate-800'>
                {/* <h1>Search Artist</h1> */}
                <form className='bg-black mx-auto text-white p-4 font-bold' onSubmit={handleArtistSubmit}>
                    <label className='mr-4' htmlFor="input">Search Artists</label>
                    <input 
                        className='text-black px-2'
                        type='text'
                        value={props.artistInputValue}
                        onChange={e => props.setArtistInputValue(e.target.value)}
                    />

                    <button className='ml-2 p-3 bg-blue-600 rounded-md' type='submit'>SEARCH</button>
                </form>
                {artistList}
            </div>
        </div>
    )
}