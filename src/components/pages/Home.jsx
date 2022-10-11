import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom" 
import axios from "axios"

export default function Home (props) {
    const [posts, setPosts] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [users, setUsers] = useState([])
    // const [username, setUsername] = useState([])

    // clears state so that search results are cleared when you navigate to different pages on the navbar
    useEffect(() => {
        try {
            props.setApiResponse([])
            props.setArtistApiResponse([])
            props.setInputValue("")
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
                // console.log(response.data)
                setPosts(response.data)
                // console.log(posts)
                const userTest = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users`)
                console.log(userTest.data)
                setUsers(userTest.data)

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
            
        let username
        const getUsername = async () => {
            try {
                const getUserInfo = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${post.user}`)
                let username = getUserInfo.data.name
            } catch(err) {
                console.warn(err)
            }
        }

        return (
            
            <div key={`${post._id}`} className="border-2 mx-auto my-2 w-64 border-blue-900">
                <div className="font-mono">
                <Link to={`/post/${post._id}`}>{post.title} by {post.artist}</Link>
                <p>Rating: {post.rating}</p>
                <p>Blurb: {post.blurb}</p>
                <p>hi{username}</p>
                {getUsername}
                </div>
            </div>
        )
        } )
    
    return (
        <div>
            <h2>Your Feed</h2>
            {allPosts}
        </div>
    )
}