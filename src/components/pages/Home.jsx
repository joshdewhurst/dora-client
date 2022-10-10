import { useEffect, useState } from "react"
import { Link } from "react-router-dom" 
import axios from "axios"

export default function Home (props) {
    const [posts, setPosts] = useState([])
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

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/post`)
                console.log(response.data)
                setPosts(response.data)
                console.log(posts)
            } catch (err) {
                console.warn(err)
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }
            }
        }
        getPosts()
    }, [])


    const allPosts = posts.map((post) => {
        return(
            
                <div key={`${post._id}`}>
                    <Link to={`/post/${post._id}`}>{post.title} by {post.artist}</Link>
                    <p>Rating: {post.rating}</p>
                    <p>Blurb: {post.blurb}</p>
                    
                </div>
            )
        } )
    
    return (
        <div>
            Home page feed
            {/* creating links to edit and create a post */}
            <Link to='/post/new'>New Post</Link>
            <Link to='/post/edit'>Edit Post</Link>

            <h2>Your Feed</h2>
            {allPosts}
        </div>
    )
}