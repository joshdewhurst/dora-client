import { Link, BrowserRouter } from 'react-router-dom'

export default function Navbar({ currentUser, handleLogout }) {
	 const loggedIn = (
		<>
			

			

			<Link to='/home'>Home Feed</Link> { " | "}
			<Link to='/trending'>Trending Now</Link> { " | "}
			<Link to='/search'>Search</Link> { " | "}
			{/* if the user is logged in... */}
			<Link to="/"> <span onClick={handleLogout}>Logout</span> </Link> { " | "}
			<Link to="/profile">Profile</Link> { " | "}
		</>
	 )

	 const loggedOut = (
		<>
			{/* if the user is not logged in... */}
			<Link to="/register">
				register
			</Link>

			<Link to="/login">
				login
			</Link>
		</>
	 )

	return (
		<nav>
			{/* user always sees this section */}
			<Link to="/">
				<p>User App</p>
			</Link>

			{currentUser ? loggedIn : loggedOut}
		</nav>
	)
}

