import { useEffect, useState } from "react"
import { Link } from "react-router-dom" 
import axios from "axios"

export default function Posts (props) {
    const [posts, setPosts] = useState([])
    const [errorMessage, setErrorMessage] = useState("")

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

    const options = {
		headers: {
			'authorization': localStorage.getItem('jwt'),
			'Accept' : 'application/json',
			'Content-Type': 'application/json'
		}
	}

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/post`, options)
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

    const userPosts = posts.slice(0).reverse().map((post) => {
        if (post.user === props.currentUser.id) {
            
            const postedAt = new Date( post.createdAt )
            let date = postedAt.toLocaleString();
            
            return(
            
                // <div key={`${post._id}`} className="bg-blue-700 p-12 rounded-3xl mb-5 flex flex-col text-white text-2xl w-1/2 mx-auto">
                //     <div className='p-4 h-fit w-fit font-bold mx-auto'>
                //         <Link to={`/post/${post._id}`}>{post.title} by {post.artist}</Link>
                //         <p>Rating: {post.rating}</p>
                //     </div>
                //     <div className='text-left p-4 bg-blue-800 rounded-3xl'>
				// 	    <p>{post.blurb}</p>
				//     </div>
                // </div>

                <div key={`${post._id}`} className="bg-blue-700 p-12 rounded-md mb-5 flex flex-col text-white text-2xl w-1/2 mx-auto">
                <div className='font-bold flex flex-row justify-start'>
                        <p>@{post.username}</p>
                </div>
                <div className="flex flex-row justify-around uppercase rounded-t-md text-black bg-indigo-200 font-bold p-4">
                    <div className="flex flex-col p-4">
                        <p className="border-b-4 border-green-400">Song</p>
                        <p className="mt-4">{post.title}</p>
                    </div>
                    <div className="flex flex-col p-4">
                        <p className="border-b-4 border-yellow-400">Artist</p>
                        <p className="mt-4">{post.artist}</p>
                    </div>
                    <div className="flex flex-col p-4">
                        <p className="border-b-4 border-red-400">Rating</p>
                        <p className="mt-4">{post.rating}</p>
                    </div>

                </div>
                <div className="p-4 bg-blue-900 rounded-b-md">
                    <h3>{post.blurb}</h3>
                </div>
                <div className="mt-8 flex justify-center">
                    <Link to={`/post/${post._id}`} className="bg-sky-500 hover:bg-sky-700 rounded-md p-2 font-bold">Expand Post</Link>
                </div>
                    <p className="w-fit text-sm">posted: {date}</p>

                </div>
            )
        } 
    })
    
 

   
    return (
        <div class="bg-blue-100">
            <h1 className="p-12 text-2xl mx-auto">Your Posts</h1>
          {userPosts}
        </div>
    )
}