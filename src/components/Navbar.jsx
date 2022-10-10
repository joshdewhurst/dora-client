import { Link, BrowserRouter } from 'react-router-dom'

export default function Navbar({ currentUser, handleLogout }) {
	 const loggedIn = (
		<div className='mx-auto w-1/2 inline-block'>
			<Link to='/home'>Home Feed</Link> { " | "}
			<Link to='/trending'>Trending Now</Link> { " | "}
			<Link to='/search'>Search</Link> { " | "}
			{/* if the user is logged in... */}
			<Link to="/"> <span onClick={handleLogout}>Logout</span> </Link> { " | "}
			<Link to="/post">Your Posts</Link> { " | "}
			<Link to="/profile">Profile</Link> 
		</div>
	 )

	 const loggedOut = (
		<div className='mx-auto w-1/2 inline-block'>
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
		<nav className='mx-auto text-4xl w-fit font-bold mb-5'>
			{/* user always sees this section */}
			<Link className='inline-block mr-12' to="/">
				<p>d'ora</p>
			</Link>

			{currentUser ? loggedIn : loggedOut}
		</nav>
	)
}

