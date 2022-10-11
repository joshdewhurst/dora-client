import { useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

export default function EditProfile(props) {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    const { userId } = useParams()
    


    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${userId}`)
                console.log(response.data)
            } catch(err) {
                console.warn(err) 
                    if(err.response) {
                        setErrorMessage(err.response.data.message)
                    }
                
            }
        }
        getUser()
    })
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const reqBody = {
                name,
                email,
                password,
                username
            }
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/profile/${userId}/edit`, reqBody)
            const { token }  = response.data
            console.log("token", token )
            localStorage.setItem("jwt", token)
            const decoded = jwt_decode(token)
            props.setCurrentUser(decoded)
           
            navigate(`/profile`)


        } catch (err) {
            console.warn(err)
            if (err.response) {
                setErrorMessage(err.response.data.message)
            }
        }
    }
    return(
        <div>
            <div>
			<h1 className='text-2xl font-bold'>Edit your account:</h1>

			<p>{errorMessage}</p>

			<form className='text-3xl w-1/3 mx-auto' onSubmit={handleSubmit}>
				<div className='flex justify-around '>
					<div className='w-1/2'>
						<label htmlFor='name'>Name:</label>
					</div>
					<div className='w-fit'>
						<input 
							type="text"
							id="name"
							placeholder='your username...'
							onChange={e => setName(e.target.value)}
							value={name}
						/>
					</div>
				</div>

				<div className='flex justify-around '>
					<div className='w-1/2'>
						<label htmlFor='username'>Username:</label>
					</div>
					<div className='w-fit'>
						<input 
							type="text"
							id="username"
							placeholder='your email...'
							onChange={e => setUsername(e.target.value)}
							value={username}
						/>
					</div>
				</div>

				<div className='flex justify-around '>
					<div className='w-1/2'>
						<label htmlFor='email'>Email:</label>
					</div>
					<div className='w-fit'>
						<input 
							type="email"
							id="email"
							placeholder='your email...'
							onChange={e => setEmail(e.target.value)}
							value={email}
						/>
					</div>
				</div>

				<div className='flex justify-around'>
					<div className='w-1/2'>
						<label htmlFor='password'>Password:</label>
					</div>
					<div className='w-fit'> 
						<input 
							type="password"
							id="password"
							placeholder='password...'
							onChange={e => setPassword(e.target.value)}
							value={password}
						/>
					</div>
				</div>	
				<button type="submit">Edit</button>
			</form>
		</div>
        </div>
    )
}