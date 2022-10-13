import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Post (props) {
    const [post, setPost] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const { id } = useParams()
    const navigate = useNavigate()

    const options = {
		headers: {
			'authorization': localStorage.getItem('jwt'),
			'Accept' : 'application/json',
			'Content-Type': 'application/json'
		}
	}

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
        const getPost = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/post/${id}`, options)
                // console.log("RESPONSEDATA", response.data)
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
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/post/${id}`, options)
            navigate("/posts")
            

        } catch (err) {
            console.warn(err) 
            if (err.response) {
                setErrorMessage(err.response.data.message)
            }
        }
    }

    const postedAt = new Date( post.createdAt )
    let date = postedAt.toLocaleString();

    return (
        <div class="bg-blue-100 h-screen">
            <br></br>
            <div className="flex ml-80 text-2xl">
                <Link to={`/posts`} className="underline hover:no-underline
                   text-blue-600 hover:text-blue-800 
                   visited:text-purple-600">
                    Home Feed
                </Link>
            </div>
          
            <br></br>
            <div className="bg-emerald-400 drop-shadow-2xl p-12 rounded-md mt-12 flex flex-col text-white text-2xl w-2/3 mx-auto">
                    <div className='flex w-3/4 text-2xl font-bold flex-col p-2'>
						<h3 className='w-fit drop-shadow-lg hover:text-slate-200'>Posted at: {date}</h3>
					</div>
                 <div className="flex flex-row justify-around uppercase rounded-t-md text-black bg-white  font-bold p-2">
					<div className='flex w-1/3 flex-col p-2'>
						<p className="mb-2 border-b-4 border-rose-500 hover:text-rose-500">Title:</p>
						{post.title}
					</div>
					<div className='flex w-1/3 flex-col p-2'>
						<p className="mb-2 border-b-4 border-pink-500 hover:text-pink-500">Artist</p>
						{post.artist}
					</div>	
                    <div className='flex w-1/3 flex-col p-2'>
						<p className="mb-2 border-b-4 border-fuchsia-500 hover:text-fuchsia-500">Rating</p>
						{post.rating}
					</div>	
				</div>
                <div className="p-4 bg-lime-600 rounded-b-md hover:bg-lime-500">
						<h1 className='text-2xl font-bold'>{post.blurb}</h1>	
				</div>
                    {post.user === props.currentUser.id ? 
                    <div className='mt-8 flex justify-between w-1/2 mx-auto'>
                        <Link to={`/post/${id}/edit`}><button className="mr-2 bg-cyan-600 hover:bg-white hover:text-teal-200 rounded-md p-2 font-bold">Edit Post</button>
                        </Link>
                        <button onClick={deletePost} className=" ml-2 bg-cyan-600 hover:bg-white hover:text-teal-200 rounded-md p-2 font-bold">Delete</button>
                    </div> : 
                    <div></div>
                    }
                    
            </div>

            
           
           
           
        </div>
    )
}