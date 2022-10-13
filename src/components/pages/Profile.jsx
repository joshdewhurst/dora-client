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

	const options = {
		headers: {
			'authorization': localStorage.getItem('jwt'),
			'Accept' : 'application/json',
			'Content-Type': 'application/json'
		}
	}

	// useEffect for getting the user data and checking auth
	useEffect(() => {
	const fetchData = async () => {
			try {
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

	return (
		<div className="bg-yellow-400 drop-shadow-2xl p-12 rounded-md mt-12 flex flex-col text-white text-2xl w-2/3 mx-auto">
				<div className='flex w-1/2 text-3xl font-bold flex-col p-2'>
					<h3 className='w-fit drop-shadow-lg'>{currentUser.username}</h3>
				</div>
				<img src='https://i.postimg.cc/CLkCtXfb/My-project-1.png' />
			<div className="flex flex-row justify-around uppercase rounded-t-md text-black bg-white  font-bold p-2">
				<div className='flex w-1/2 flex-col p-2'>
					<p className="mb-2 border-b-4 border-green-400">Name</p>
					{currentUser.name}
				</div>
				<div className='flex w-1/2 flex-col p-2'>
					<p className="mb-2 border-b-4 border-yellow-400">Email</p>
					{currentUser.email}
				</div>	
			</div>
			<div className="p-4 bg-blue-900 rounded-b-md">
					<h1 className='text-2xl font-bold'>Profile - See your posts and edit your account!</h1>
					<p>{msg}</p>
					
				</div>
				<div className='mt-8 flex justify-between w-1/2 mx-auto'>
					<Link to={`/profile/${currentUser.id}/edit`}><button className="bg-blue-800 hover:bg-white hover:text-yellow-500 rounded-md p-2 font-bold">Edit Profile</button></Link>
					<Link to={"/posts"}><button className="bg-blue-800 hover:bg-white hover:text-yellow-500 rounded-md p-2 font-bold">Your Posts</button></Link>

				</div>
		</div>
	)
}