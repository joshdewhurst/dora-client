import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'

export default function Register({ currentUser, setCurrentUser }) {
	// state for the controlled form
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')
	const [msg, setMsg] = useState('')
	

	// submit event handler
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			// post fortm data to the backend
			const reqBody = {
				name,
				email, 
				password,
				username
			}
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`, reqBody)

			// save the token in localstorage
			const { token } = response.data
			// console.log("register token", token)
			localStorage.setItem('jwt', token)

			// decode the token
			const decoded = jwt_decode(token)

			// set the user in App's state to be the decoded token
			setCurrentUser(decoded)

		} catch (err) {
			console.warn(err)
			if (err.response) {
					setMsg(err.response.data.msg)
			}
		}
 	}

	// conditionally render a navigate component
	if (currentUser) {
		return <Navigate to="/profile" />
	}

	return (
		<div className="bg-blue-700 p-12 rounded-md mt-12 flex flex-col text-white text-2xl w-2/3 mx-auto">
			<form className='' onSubmit={handleSubmit}>	
				<div className='font-bold w-1/3  flex flex-row justify-start'>
				<label className="mb-2">Username</label>
						<input required className='h-1/3 mb-2 bg-blue-700 ml-2' type="text" id="username" placeholder='username' onChange={e => setUsername(e.target.value)} value={username} />
					
				</div>
				<div className="flex flex-row justify-around uppercase rounded-t-md text-black bg-indigo-200  font-bold p-2">
					<div className='flex w-1/3 flex-col p-2'>
						<label className="mb-2 border-b-4 border-green-400">Name</label>
						<input required className='pl-2' type="text" id="name" placeholder='name' onChange={e => setName(e.target.value)} value={name} />
					</div>

					<div className='flex w-1/3  flex-col p-2'>
						<label className="mb-2 border-b-4 border-yellow-400">Email</label>
						<input required className='pl-2' type="email" id="email" placeholder='email' onChange={e => setEmail(e.target.value)} value={email} />
					</div>

					<div className='flex w-1/3  flex-col p-2'>
						<label className='mb-2 border-b-4 border-red-400'>Password</label>
						<input required className='pl-2' type="password" id="password" placeholder='password' onChange={e => setPassword(e.target.value)} value={password} />
					</div>

				</div>

				<div className="p-4 bg-blue-900 rounded-b-md">
					<h1 className='text-2xl font-bold'>Register for an account:</h1>
					<p>{msg}</p>
				</div>

				<div className='mt-8 flex justify-center'>
					<button className="bg-sky-500 hover:bg-sky-700 rounded-md p-2 font-bold" type="submit">Register</button>
				</div>

			</form>
		</div>
			
	)
}