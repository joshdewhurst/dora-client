import { useEffect, useState } from "react"
import { Link } from "react-router-dom" 
import axios from "axios"

export default function Posts (props) {
    const [posts, setPosts] = useState([])
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/post`)
                console.log(response.data)
                setPosts(response.data)
            } catch (err) {
                console.warn(err)
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }
            }
        }
        getPosts()
    }, [])

    const userPosts = posts.map((post) => {
        if (post.user === props.currentUser.id) {  
            return(
            
                <div key={`${post._id}`}>
                    <Link to={`/post/${post._id}`}>{post.title} by {post.artist}</Link>
                    <p>Rating: {post.rating}</p>
                    <p>Blurb: {post.blurb}</p>
                    
                </div>
            )
        } 
    })
    
 

   
    return (
        <div>
            <h1>Your Posts</h1>
          {userPosts}
        </div>
    )
}