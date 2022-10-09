import { useEffect, useState } from 'react'

export default function NewPost (props) {
console.log(props.test)
       
    
    return (
        <div>
            {/* need to add submit button and handler */}
            <form>
                <label htmlFor="songTitle">Song Title:</label>
                <input type="text" id="songTitle" value={`${props.track.track.name}`} readOnly></input>
                <br></br>
                <label htmlFor="songArtist">Artist:</label>
                <input type="text" id="songArtist" value={`${props.track.track.artist}`} readOnly></input>
                <br></br>
                <label htmlFor="songRating">Rating:</label>
                <input type="number" id="songRating" max="10"></input>
                <br></br>
                <label htmlFor="songBlurb">Blurb:</label>
                <input type="text" id="blurb"></input>


            </form>
        </div>
    )
}