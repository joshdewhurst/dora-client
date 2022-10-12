import { useEffect, useState, useReducer } from "react"
import { Link, useParams } from "react-router-dom" 
import axios from "axios"


// const Reactions = {
//     likes: 0,
//     dislikes: 0
//   }

const appReducer = (state, action) => {
    switch(action.type) {
        // making it so the likes and dislikes toggle and cannot run simultaneously through useReducer
      case 'HANDLE_LIKE':
        return {
          ...state,
          likes: state.likes + action.payload
        }
      case 'HANDLE_DISLIKE':
        return {
          ...state,
          dislikes: state.dislikes + action.payload
        }
      default:
        return state
    }
  }

export default function Home (props) {
    
    const [posts, setPosts] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [users, setUsers] = useState([])
    
    // useReducer constants
    // const [state, dispatch] = useReducer(appReducer, Reactions)
    // const { likes, dislikes } = state
    // const [status, setStatus] = useState(null)


    useEffect(() => {

        const getPosts = async () => {
            try {
                // calling on the DB to render a list of all post
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/post`,{
                    headers: {
                        'authorization': localStorage.getItem('jwt'),
                        'Accept' : 'application/json',
                        'Content-Type': 'application/json'
                    }
                })

                // console.log(response.data)
                setPosts(response.data)
                // console.log(posts)
                const userTest = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users`, options)
                console.log(userTest.data)
                setUsers(userTest.data)

            } catch (err) {
                console.warn(err)
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }
            }
        }
        getPosts()
    }, [])

    // saving for later.
    // const handleClickLike = () => {
    //     // if like was already clicked remove a like
    //     if (status==='like') {
    //       setStatus(null)
    //       dispatch({
    //         type: 'HANDLE_LIKE',
    //         payload: -1,
    //       })
    //     } 
    //     // if like is clicked remove a dislike, user can only like OR dislike
    //     else {
    //       setStatus('like')
    //       if (status==='dislike') {
    //         dispatch({
    //           type: 'HANDLE_DISLIKE',
    //           payload: -1,
    //         })
    //       }
    //     //   add a like to the counter
    //       dispatch({
    //         type: 'HANDLE_LIKE',
    //         payload: 1,
    //       })
    //     }
    //   }
      
    //   const handleClickDislike = () => {
    //     // if dislike was already clicked remove a dislike
    //     if (status==='dislike') {
    //       setStatus(null)
    //       dispatch({
    //         type: 'HANDLE_DISLIKE',
    //         payload: -1,
    //       })
    //     } 
    //     // if dislike is clicked remove a like, user can only like OR dislike
    //     else {
    //       setStatus('dislike')
    //       if (status==='like') {
    //         dispatch({
    //           type: 'HANDLE_LIKE',
    //           payload: -1,
    //         })
    //       }
    //     //   add a dislike to the count
    //       dispatch({
    //         type: 'HANDLE_DISLIKE',
    //         payload: 1,
    //       })
    //     }
    //   }
      
    const options = {
		headers: {
			'authorization': localStorage.getItem('jwt'),
			'Accept' : 'application/json',
			'Content-Type': 'application/json'
		}
	}



    const allPosts = posts.slice(0).reverse().map((post) => {

        const postedAt = new Date( post.createdAt )
        let date = postedAt.toLocaleString();

        return (
            
            <div key={`${post._id}`} className="bg-blue-700 p-12 rounded-md mb-5 flex flex-col text-white text-2xl w-1/2 mx-auto">
                <div className='font-bold flex flex-row justify-start'>
                        <p>@{post.username}</p>
                </div>
                <div className="flex flex-row justify-around uppercase rounded-t-md text-black bg-indigo-200 font-bold p-4">
                    <div className="flex flex-col p-4">
                        <p className="border-b-4 border-green-400">Song</p>
                        <p className="mt-4">{post.title}</p>
                    </div>
                    <div className="flex flex-col p-4">
                        <p className="border-b-4 border-yellow-400">Artist</p>
                        <p className="mt-4">{post.artist}</p>
                    </div>
                    <div className="flex flex-col p-4">
                        <p className="border-b-4 border-red-400">Rating</p>
                        <p className="mt-4">{post.rating}</p>
                    </div>

                </div>
                <div className="p-4 bg-blue-900 rounded-b-md">
                    <h3>{post.blurb}</h3>
                </div>
                <div className="mt-8 flex justify-center">
                    <Link to={`/post/${post._id}`} className="bg-sky-500 hover:bg-sky-700 rounded-md p-2 font-bold">Expand Post</Link>
                </div>
                    <p className="w-fit text-sm">posted: {date}</p>
                {/* <div>
                  <button className="bg-sky-500 hover:bg-sky-700 rounded-md p-2 font-bold" onClick={handleClickLike}>Like</button>
                  <button className="bg-sky-500 hover:bg-sky-700 rounded-md p-2 font-bold" onClick={handleClickDislike}>Dislike</button>
                  <div>
                      <p>Likes: {likes}</p>
                      <p>Dislikes: {dislikes}</p>
                  </div>
                </div> */}
            </div>
                
            
        )
        } )
    
    return (
        <div className="bg-blue-100">
            <h2 className="bg-blue-300 p-8 mt-4rounded-md flex flex-col text-6xl w-1/2 mx-auto">explorin'</h2>
            <p>{allPosts}</p>

           

        </div>
    )
}