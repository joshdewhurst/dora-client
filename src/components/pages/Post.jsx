import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Post () {
    const [post, setPost] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/post/${id}`)
                console.log("RESPONSEDATA", response.data)
                setPost(response.data)
            } catch (err) {
                console.warn(err)
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }
            }
        }
        getPost()
    }, [])

    const deletePost = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/post/${id}`)
            navigate("/post")
            

        } catch (err) {
            console.warn(err) 
            if (err.response) {
                setErrorMessage(err.response.data.message)
            }
        }
    }
    return (
        <div>
            <div>
                <h1>Song Post</h1>
                <h2>Title: {post.title}</h2>
                <h2>Artist: {post.artist}</h2>
                <h3>Rating: {post.rating}</h3>
                <p>Blurb: {post.blurb}</p>
            </div>
            <div>
                <Link to={`/post/${id}/edit`}>
                    <button>Edit</button>
                </Link>
                <button onClick={deletePost}>Delete Post</button>
            </div>
           
        </div>
    )
}