import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom" 
import axios from "axios"

export default function Home (props) {
    const [posts, setPosts] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [users, setUsers] = useState([])
    // const [username, setUsername] = useState([])

    useEffect(() => {
            props.setApiResponse([])
            props.setArtistApiResponse([])
            props.setInputValue("")
            props.setArtistInputValue("")
            props.setSearch("")
            props.setArtist("")
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
            
            <div key={`${post._id}`} className="bg-blue-700 p-12 rounded-3xl mb-5 flex flex-col text-white text-2xl w-1/2 mx-auto">
                <div className='p-4 h-fit w-fit font-bold object-center mx-auto'>
                <p className="text-left"> @username </p>
                <table class="table-auto border-separate border-spacing-4 border rounded-lg">
                    <thead>
                        <tr>
                        <th className="border-2 border-blue-400 rounded-full text-center p-1">Song</th>
                        <th className="border-2 border-blue-800 rounded-full text-center">Artist</th>
                        <th className="border-2 border-blue-600 rounded-full text-center">Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="text-left">
                        <td>{post.title}</td>
                        <td>{post.artist}</td>
                        <td>{post.rating}</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <p className="text-center">Blurb: {post.blurb}</p>
                </div>
                <Link to={`/post/${post._id}`} className="bg-sky-500 hover:bg-sky-700 rounded-lg p-1 m-2">Expand Post</Link>
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