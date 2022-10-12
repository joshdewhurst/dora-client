import userEvent from '@testing-library/user-event'
import PreviousMap from 'postcss/lib/previous-map'
import { Link, BrowserRouter } from 'react-router-dom'

export default function Navbar({ currentUser, handleLogout }) {
	 const loggedIn = (
		<div className='mx-auto w-3/4 inline-block flex-nowrap text-lg uppercase'>
			<Link to='/home'>Feed</Link> { " | "}
			<Link to='/post/new/direct'>New Post</Link> { " | "}
			<Link to='/trending'>Trending</Link> { " | "}
			<Link to='/search'>Search</Link> { " | "}
			{/* if the user is logged in... */}
			<Link to={`/profile/`}>Profile</Link>
			<Link className='ml-12' to="/"> <span onClick={handleLogout}>Logout</span> </Link> 
		</div>
	 )

	 const loggedOut = (
		<div className='mx-auto w-fit inline-block'>
			
			{/* if the user is not logged in... */}
			<Link to="/register">
				register
			</Link>

			<Link className='ml-3' to="/login">
				login
			</Link>
		</div>
	 )

	return (
		<nav className='bg-blue-600'>
			<div className='mx-auto text-4xl w-fit  whitespace-nowrap font-bold p-5 text-white'>
				<Link className='inline-block mr-12' to="/">
					<p className='text-5xl'>d'ora</p>
				</Link>
				{currentUser ? loggedIn : loggedOut}
			</div>
		</nav>
	)
}

