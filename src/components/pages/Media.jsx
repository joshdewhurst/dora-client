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
    

    useEffect(() => {
        const mediaSearch = async () => {
            try {
                const trackSearchUrl =  `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${name}&api_key=${process.env.REACT_APP_API_KEY}&format=json`
                const artistSearchUrl = `http://ws.audioscrobbler.com//2.0/?method=artist.search&artist=${artist}&api_key=${process.env.REACT_APP_API_KEY}&format=json`
                const image = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.REACT_APP_API_KEY}&artist=${artist}&track=${name}&format=json`
                const mediaResp = await axios.get(trackSearchUrl)
                const singerResp = await axios.get(artistSearchUrl)
                const imageResp = await axios.get(image)
                // console.log(mediaResp)
                // console.log(singerResp)
                setSinger(singerResp.data.results.artistmatches.artist[0])
                setMedia(mediaResp.data.results.trackmatches.track[0])
                setImage(imageResp.data.track.album.image[3]["#text"])
                

            } catch(err) {
                console.warn(err)
            }
            
        }
        mediaSearch()
    }, [])

    return (
        <div>
            <div>
                <h1>Song info</h1>
                {media.name}
                {media.artist}
                {media.listeners}
                

            </div>
            <div>
                <h1>singer info</h1>
                {singer.name}
                {singer.listeners}
            </div>
            <div>
                <img class="mx-auto" src={image} alt={`${media.name} album cover`}></img>
            </div>
            
        </div>
    )
}