import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'

export default function Login({ currentUser, setCurrentUser }) {
	// state for the controlled form
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState('')

	// submit event handler
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			// post fortm data to the backend
			const reqBody = {
				email, 
				password
			}
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/login`, reqBody)

			// save the token in localstorage
			const { token } = response.data
			localStorage.setItem('jwt', token)

			// decode the token
			const decoded = jwt_decode(token)

			// set the user in App's state to be the decoded token
			setCurrentUser(decoded)

		} catch (err) {
			console.warn(err)
			if (err.response) {
				if (err.response.status === 400) {
					setMsg(err.response.data.msg)
				}
			}
		}
 	}

	// conditionally render a navigate component
	if (currentUser) {
		return <Navigate to="/profile" />
	}

	return (
		<div className="bg-blue-700 p-12 rounded-md mt-12 flex flex-col text-white text-2xl w-2/3 mx-auto">
			<form onSubmit={handleSubmit}>
				<div className='font-bold w-1/3 flex flex-row justify-start mb-2 uppercase'>
					<h3>welcome back</h3>
				</div>
				<div className="flex flex-row justify-around uppercase rounded-t-md text-black bg-indigo-200  font-bold p-2">
					<div className='flex w-1/2 flex-col p-2'>
						<label className="mb-2 border-b-4 border-yellow-400" htmlFor='email'>Email:</label>
						<input className='pl-2' type="email" id="email" placeholder='email' onChange={e => setEmail(e.target.value)} value={email} />
					</div>

					<div className='flex w-1/2 flex-col p-2'>
						<label className='mb-2 border-b-4 border-red-400' htmlFor='password'>Password:</label>
						<input className='pl-2' type="password" id="password" placeholder='password' onChange={e => setPassword(e.target.value)} value={password} />
					</div>

				</div>
				<div className="p-4 bg-blue-900 rounded-b-md">
					<h1 className='text-2xl font-bold'>Login to your account:</h1>
						<p>{msg}</p>
				</div>

				<div className='mt-8 flex justify-center'>
					<button className="bg-sky-500 hover:bg-sky-700 rounded-md p-2 font-bold" type="submit">Login</button>
				</div>
			</form>
		</div>
	)
}