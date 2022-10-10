import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom" 

export default function Profile({ currentUser, handleLogout, props }) {
	// state for the secret message (aka user privilaged data)
	const [msg, setMsg] = useState('')
	// Setting other states
	const [posts, setPosts] = useState([])
    const [errorMessage, setErrorMessage] = useState("")

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
			<h1>Hello, {currentUser.name}</h1>

			<p>your email is {currentUser.email}</p>

			<h2>Here is the secret message that is only availible to users of User App:</h2>

			<h3>{msg}</h3>

			<h1>Your Posts</h1>
         	 {userPosts}
		</div>
	)
}