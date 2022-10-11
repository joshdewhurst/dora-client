import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom" 

export default function Profile({ currentUser, handleLogout, props }) {
	// state for the secret message (aka user privilaged data)
	const [msg, setMsg] = useState('')
	// Setting other states
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

	// useEffect for getting the user data and checking auth
	useEffect(() => {
	const fetchData = async () => {
			try {
				// get the token from local storage
				const token = localStorage.getItem('jwt')
				// make the auth headers
				const options = {
					headers: {
						'Authorization': token
					}
				}
				// hit the auth locked endpoint
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`, options)
				// example POST with auth headers (options are always last argument)
				// await axios.post(url, requestBody (form data), options)
				// set the secret user message in state
				setMsg(response.data.msg)
			} catch (err) {
				// if the error is a 401 -- that means that auth failed
				console.warn(err)
				if (err.response) {
					if (err.response.status === 401) {
						// panic!
						handleLogout()
					}
				}
			}
		}
		fetchData()
	})


// creating a new UseEffect for rendering the user posts
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
	if (post.user === currentUser.id) {
		  
		return(
		
			<div key={`${post._id}`} className="bg-blue-700 p-12 rounded-3xl mb-5 flex flex-col text-white text-2xl">
			
				<div className='text-left p-4 h-fit w-fit font-bold'>
					<Link to={`/post/${post._id}`}>{post.title} by {post.artist}</Link>
					<p>Rating: {post.rating}</p>
				</div>
				<div className='text-left p-4 bg-blue-800 rounded-3xl'>
					<p>{post.blurb}</p>
				</div>
				
			</div>
		)
	} 
})



	return (
		<div className='flex h-84 flex-row  mx-auto'>
			<div className='w-2/5 flex justify-end'>
				<div className='w-2/3 p-8 mt-24 text-white text-left font-bold uppercase bg-blue-900 rounded-3xl h-fit'>
						<h1 className='text-5xl'>Welcome,<br/> {currentUser.name}</h1>
						<p className='text-3xl'>Email: {currentUser.email}</p>
						<Link to={`/profile/${currentUser.id}/edit`}><button className='mt-3 p-3 bg-blue-600 rounded-md'>Edit Profile</button></Link>
				</div>
			</div>
			<div className='w-full flex justify-start'>
				<div className='w-5/6 p-24'>
					{userPosts}
				</div>
			</div>
		</div>
	)
}