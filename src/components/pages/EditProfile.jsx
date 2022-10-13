import { useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

export default function EditProfile(props) {
    const [name, setName] = useState(`${props.currentUser.name}`)
    const [username, setUsername] = useState(`${props.currentUser.username}`)
    const [email, setEmail] = useState(`${props.currentUser.email}`)
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    const { userId } = useParams()
    


    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${userId}`, options)
                // console.log(response.data)
            } catch(err) {
                console.warn(err) 
                    if(err.response) {
                        setErrorMessage(err.response.data.message)
                    }
                
            }
        }
        getUser()
    })

	const options = {
		headers: {
			'authorization': localStorage.getItem('jwt'),
			'Accept' : 'application/json',
			'Content-Type': 'application/json'
		}
	}

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const reqBody = {
                name,
                email,
                password,
                username
            }
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/profile/${userId}/edit`, reqBody, options)
            const { token }  = response.data
            // console.log("token", token )
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

		<div className="bg-yellow-400 p-12 rounded-md mt-12 flex flex-col text-white drop-shadow-2xl text-2xl w-2/3 mx-auto">
			<form className='' onSubmit={handleSubmit}>	
				<div className='font-bold w-1/3  flex flex-row justify-start'>
				<label className="mb-2">Username</label>
						<input required className='h-1/3 mb-2 text-3xl  bg-yellow-400 ml-2' type="text" id="username" placeholder='username' onChange={e => setUsername(e.target.value)} value={username} />
					
				</div>
				<div className="flex flex-row justify-around uppercase rounded-t-md text-black bg-white  font-bold p-2">
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
					<h1 className='text-2xl font-bold'>Update your account!</h1>
					<p>{errorMessage}</p>
				</div>

				<div className='mt-8 flex justify-center'>
					<button className="bg-blue-800 hover:bg-white hover:text-yellow-500 rounded-md p-2 font-bold" type="submit">Update</button>
				</div>

			</form>
		</div>
    )
}