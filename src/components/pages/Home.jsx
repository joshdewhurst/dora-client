import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom" 
import axios from "axios"

export default function Home (props) {
    const [posts, setPosts] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [users, setUsers] = useState([])

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

        let getUserInfo = axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${post.user}`)
        .then (response => {
            getUserInfo= response.data.name
            
            return getUserInfo});
            console.log(getUserInfo)

        return(
            
                <div key={`${post._id}`} className="border-2 mx-auto my-2 w-64 border-blue-900">
                    <div className="font-mono">
                    <Link to={`/post/${post._id}`}>{post.title} by {post.artist}</Link>
                    <p>Rating: {post.rating}</p>
                    <p>Blurb: {post.blurb}</p>
                    {getUserInfo}
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