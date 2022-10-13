import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Search (props) {
    console.log(window.performance.navigation);//PerformanceNavigation {type: 1, redirectCount: 0}
    console.log(window.performance.getEntriesByType("navigation")[0].type); //
    // const [state, setState] = useState({})
    // const [errorMessage, setErrorMessage] = useState('')
    const [searchType, setSearchType] = useState('song')
   

    // clears state so that search results are cleared when you navigate to different pages on the navbar
    // useEffect(() => {
    //     try {
    //         props.setApiResponse([])
    //         props.setArtistApiResponse([])
    //         props.setInputValue("")
    //         props.setSearch("")
    //         props.setArtist("")
    //     }catch (err) {
    //         console.warn(err)
    //         if (err.response) {
    //             setErrorMessage(err.response.data.message)
    //         }
    //     }
    // }, [])

   
    const trackList = props.apiResponse.map((track, i) => {
        console.log( {track})
        return (
            <div key={`track${i}`} className="my-4 flex p-4 w-1/3 mx-auto bg-blue-100">
                <div className='w-full bg-blue-900 p-8 rounded-3xl'>
                    <div className=' text-white text-left font-bold'>
                        <h1 className='uppercase text-3xl text-center'>{track.name}</h1>
                        <h2 className='text-2xl text-center'>Artist: {track.artist}</h2>
                    </div>
                    <div className='bg-blue-600 w-fit mx-auto p-2 rounded-md font-bold my-2 text-white'>
                        <Link to="/post/new/track"><button onClick={() => props.setTrack({ track })}>POST SONG</button></Link>
                    </div>
                    <div className='bg-blue-600 w-fit mx-auto p-2 rounded-md font-bold my-2 text-white'>
                    <Link to={`../media/${track.name}/${track.artist}`}><button onClick={() => props.setTrack( track )}>SONG INFO</button></Link>
                    </div>
            </div>
    </div>
        )
    })    

    const artistList = props.artistApiResponse.map((artist, i) => {
        return (
            <div key={`artist${i}`} className="my-4 flex p-4 w-1/3 mx-auto">
                <div className=' text-white text-left font-bold w-full bg-blue-900 p-8 rounded-3xl'>
                    <h1 className="text-center text-3xl">{artist.name}</h1>
                    <div className='bg-blue-600 w-fit mx-auto p-2 rounded-md font-bold my-2 text-white'>
                        <Link to="/post/new/artist"><button onClick={() => props.setArtist({artist})}>POST ARTIST</button></Link>
                        
                    </div>
                </div>

            </div>
        )
    })  
    
    const handleSearch = (e) => {
        e.preventDefault()
        if (searchType === 'song') {
            props.setSearch(props.inputValue)

        }

        if (searchType === 'artist') {
            props.setArtist(props.inputValue)

        }
    }

    const handleSearchClickArtist = () => {
        setSearchType('artist')
            
    }

    const handleSearchClickSong = () => {
        setSearchType('song')
    }


    return (
        <div className="bg-blue-100 h-screen">
            <div className='flex bg-slate-600 p-4 flex-row justify-center mx-auto text-white font-bold'>
                <button className={`w-fit h-fit ml-2 p-3 ${searchType==='song'? 'bg-blue-800' : 'bg-blue-600'} rounded-md`} onClick={handleSearchClickSong}>SONGS</button>
                <button className={`w-fit h-fit ml-2 p-3 ${searchType==='artist'? 'bg-blue-800' : 'bg-blue-600'} rounded-md`} onClick={handleSearchClickArtist}>ARTISTS</button>
                <form className='w-fit ' onSubmit={handleSearch}>
                    <label className='mr-2' htmlFor="input"></label>
                    <input 
                        className='text-black p-2 rounded-md'
                        type='text'
                        value={props.inputValue}
                        onChange={e => {props.setInputValue(e.target.value)}}
                    />

                    <button className='ml-2 p-3 bg-blue-600 rounded-md' type='submit'>SEARCH</button>
                </form>
            </div>
            <div className="bg-blue-100">
                {searchType==='song'? trackList : artistList }
            </div>
                
        </div>
    )
}