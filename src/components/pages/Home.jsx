import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom" 
import axios from "axios"

export default function Home (props) {
    const [posts, setPosts] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [users, setUsers] = useState([])
    // const [username, setUsername] = useState([])

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
        const getUserInfo = axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${post.user}`)
        .then ((response) => {
            console.log(response.data.name)
            username = response.data.name
        })

        return (
            
            <div key={`${post._id}`} className="bg-blue-700 p-12 rounded-3xl mb-5 flex flex-col text-white text-2xl ">
                <div className='text-left p-4 h-fit w-fit font-bold'>
                <Link to={`/post/${post._id}`}>{post.title} by {post.artist}</Link>
                <p>Rating: {post.rating}</p>
                <p>Blurb: {post.blurb}</p>
                <p>hi{username}</p>
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