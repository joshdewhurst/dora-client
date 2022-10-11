import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Search (props) {
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
        
        return (
            <div key={`track${i}`} className="my-4 flex p-4 w-1/3 mx-auto ">
                <div className='w-full bg-blue-900 p-8 rounded-3xl'>
                    <div className=' text-white text-left font-bold'>
                        <h1 className='uppercase'>{track.name}</h1>
                        <h2>Artist: {track.artist}</h2>
                    </div>
                    <div className='bg-blue-600 w-fit mx-auto p-2 rounded-md font-bold my-2 text-white'>
                        <Link to="/post/new"><button onClick={() => props.setTrack({ track })}>POST SONG</button></Link>
                    </div>
            </div>
    </div>
        )
    })    

    const artistList = props.artistApiResponse.map((artist, i) => {
        return (
            <div key={`artist${i}`} className="my-4 flex p-4 w-1/3 mx-auto">
                <div className=' text-white text-left font-bold w-full bg-blue-900 p-8 rounded-3xl'>
                    <h1>{artist.name}</h1>
                    <div className='bg-blue-600 w-fit mx-auto p-2 rounded-md font-bold my-2 text-white'>
                        <Link to="/post/new"><button onClick={() => props.setArtist({artist})}>POST SONG</button></Link>
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
        <div>
            <div className='flex bg-slate-600 p-4 flex-row justify-center mx-auto text-white font-bold'>
                <button className={`w-fit h-fit ml-2 p-3 ${searchType==='song'? 'bg-blue-800' : 'bg-blue-600'} rounded-md`} onClick={handleSearchClickSong}>SONGS</button>
                <button className={`w-fit h-fit ml-2 p-3 ${searchType==='artist'? 'bg-blue-800' : 'bg-blue-600'} rounded-md`} onClick={handleSearchClickArtist}>ARTISTS</button>
                <form className='w-fit ' onSubmit={handleSearch}>
                    <label className='mr-2' htmlFor="input"></label>
                    <input 
                        className='text-black p-2 rounded-md'
                        type='text'
                        value={props.inputValue}
                        onChange={e => props.setInputValue(e.target.value)}
                    />

                    <button className='ml-2 p-3 bg-blue-600 rounded-md' type='submit'>SEARCH</button>
                </form>
            </div>
                {searchType==='song'? trackList : artistList }
        </div>
    )
}