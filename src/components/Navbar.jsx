import { Link, BrowserRouter } from 'react-router-dom'

export default function Navbar({ currentUser, handleLogout }) {
	 const loggedIn = (
		<div className='mx-auto w-3/4 inline-block flex-nowrap'>
			<Link to='/home'>Feed</Link> { " | "}
			<Link to='/trending'>Trending</Link> { " | "}
			<Link to='/search'>Search</Link> { " | "}
			{/* if the user is logged in... */}
<Link to="/"> <span onClick={handleLogout}>Logout</span> </Link> { " | "}
			<Link to="/post">Your Posts</Link> { " | "}
			<Link to="/profile">Profile</Link> 
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
			<div className='mx-auto text-4xl w-fit  whitespace-nowrap font-bold mb-5 p-5 text-white'>
				<Link className='inline-block mr-12' to="/">
					<p>d'ora</p>
				</Link>
				{currentUser ? loggedIn : loggedOut}
			</div>
		</nav>
	)
}

