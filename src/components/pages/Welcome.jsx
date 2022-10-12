import { useEffect, useState } from "react"

export default function Welcome(props) {
	const [errorMessage, setErrorMessage] = useState("")
	console.log(window.performance.navigation);//PerformanceNavigation {type: 1, redirectCount: 0}
    console.log(window.performance.getEntriesByType("navigation")[0]); //

	// clears state so that search results are cleared when you navigate to different pages on the navbar
	// useEffect(() => {
    //     try {
    //         props.setApiResponse([])
	// 		props.setArtistApiResponse([])
	// 		props.setInputValue("")
    //         props.setSearch("")
    //         props.setArtist("")
    //     }catch (err) {
    //         console.warn(err)
    //         if (err.response) {
    //             setErrorMessage(err.response.data.message)
    //         }
    //     }
    // }, [])
	return (
		<div className="text-3xl font-bold bg-slate-800">
            <div className="p-5 text-white">
			    <h1>d'ora, the future of Musical Social Media.</h1>

            </div>
            <div className="flex flex-row  text-white uppercase h-[calc(100vh-10.3rem)] ">
                <div className="bg-gradient-to-r from-blue-900 to-blue-800 flex flex-col justify-around w-1/3">
                    <h2 className="text-7xl drop-shadow-2xl opacity-70" >What</h2>
                    <h2 className="text-7xl drop-shadow-2xl text-green-400 opacity-70 hover:opacity-100" >awaits</h2>
                    <h2 className="text-7xl drop-shadow-2xl opacity-70" >you</h2>
                </div>
                <div className="bg-gradient-to-r from-blue-800 to-blue-700 flex flex-col justify-around drop-shadow-2xl w-1/3 ">
                    <h2 className="text-7xl drop-shadow-2xl " >What</h2>
                    <h2 className="text-7xl drop-shadow-2xl text-yellow-400" >completes</h2>
                    <h2 className="text-7xl drop-shadow-2xl" >you</h2>
                </div>
                <div className="bg-gradient-to-r from-blue-700 to-blue-600 flex flex-col justify-around w-1/3">
                    <h2 className="text-7xl drop-shadow-2xl opacity-70" >Go</h2>
                    <h2 className="text-7xl drop-shadow-2xl text-red-400 opacity-70 hover:opacity-100" >exploring</h2>
                    <h2 className="text-7xl drop-shadow-2xl opacity-70" >for music</h2>
                </div>
            </div>
		</div>
	)
}