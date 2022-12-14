import { getSpaceUntilMaxLength } from "@testing-library/user-event/dist/utils"
import axios from "axios"
import { useEffect, useState } from "react"
import { isCompositeComponent } from "react-dom/test-utils"
import { useParams } from "react-router-dom"


export default function Media (props) {
    const { name, artist } = useParams()
    const [media, setMedia] = useState('')
    const [singer, setSinger] = useState('')
    const [image, setImage] = useState('')
    const [song, setSong] = useState('')
    

    useEffect(() => {
        const mediaSearch = async () => {
            try {
                const trackSearchUrl =  `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${name}&api_key=${process.env.REACT_APP_API_KEY}&format=json`
                const artistSearchUrl = `https://ws.audioscrobbler.com//2.0/?method=artist.search&artist=${artist}&api_key=${process.env.REACT_APP_API_KEY}&format=json`
                const image = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.REACT_APP_API_KEY}&artist=${artist}&track=${name}&format=json`
                const mediaResp = await axios.get(trackSearchUrl)
                const singerResp = await axios.get(artistSearchUrl)
                const imageResp = await axios.get(image)
                const song = await axios.get(image)
                // console.log("test", song.data.track)
                // console.log(mediaResp)
                // console.log(singerResp)
                setSinger(singerResp.data.results.artistmatches.artist[0])
                setMedia(mediaResp.data.results.trackmatches.track[0])
                setImage(imageResp.data.track.album.image[3]["#text"])
                setSong(song.data.track)
                
                

            } catch(err) {
                console.warn(err)
            }
            
        }
        mediaSearch()
    }, [])

    // formatting the numbers to show commas in the correct spots
    const songParse = parseFloat(media.listeners)
    const songListens = songParse.toLocaleString("en-US")
    const artistParse = parseFloat(singer.listeners)
    const artistListens = artistParse.toLocaleString("en-US")

    return (
        <div className="bg-blue-100 h-100">
            <br></br>
            <div className="bg-red-200 m-12 rounded-3xl mb-5 flex flex-col text-white text-2xl">
            <br></br>
            <div>
                <p className="text-6xl text-black font-bold">Song Info</p>
                <p className="font-bold text-emerald-600">{media.name}</p>
                <p className="font-bold text-emerald-600">x</p>
                <p className="font-bold text-emerald-600">{media.artist}</p>
                <p className="font-bold text-emerald-600">Song Listens: {songListens}</p>
                {/* maybe we'll add this later but the text is kinda messed up */}
                {/* <p>{song.wiki.content}</p> */}
                

            </div>
            <br></br>
            <div>
                <p className="text-6xl text-black font-bold">Singer Info</p>
                <p className="font-bold text-emerald-600">{singer.name}</p>
                <p className="font-bold text-emerald-600">Artist Listens: {artistListens}</p>
            </div>
            {/* conditional rendering because not all of the songs have pictures */}
            {image ? 
                <div>
                    <img class="mx-auto" src={image} alt={`${media.name} album cover`}></img>
                </div> : 
                <div> 
                </div>
            }
            <br></br>
            </div>
        </div>
    )
}