import { Link } from "react-router-dom"

export default function Home () {
    return (
        <div>
            Home page feed
            {/* creating links to edit and create a post */}
            <Link to='/post/new'>New Post</Link>
            <Link to='/post/edit'>Edit Post</Link>
        </div>
    )
}