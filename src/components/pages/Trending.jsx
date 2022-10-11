import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export default function Trending(props) {
    const [errorMessage, setErrorMessage] = useState("")

    // clears state so that search results are cleared when you navigate to different pages on the navbar
    useEffect(() => {
        try {
            props.setApiResponse([])
            props.setArtistApiResponse([])
            props.setInputValue("")
            props.setSearch("")
            props.setArtist("")
        }catch (err) {
            console.warn(err)
            if (err.response) {
                setErrorMessage(err.response.data.message)
            }
        }
    }, [])
  
    // const topTracks = props.trending.map((track, i) => {
    //     return(
            
    //         // <div key={`track${i}`} className='w-2/3 text-3xl flex justify-around p-4 mx-auto'>
    //         //     <div className="w-2/5 text-right">
    //         //         {track.name}
    //         //     </div>
    //         //         -
    //         //     <div className="w-2/5 text-left flex justify-between">
    //         //         <p> {track.artist.name}</p>
    //         //         <Link className="text-sm text-blue-900" to={`../media/${track.name}/${track.artist.name}`}>Details</Link>
    //         //     </div>
    //         // </div>       
    //         <div key={`track${i}`} class="container flex justify-center mx-auto">
    //             <div class="flex flex-col">
    //                 <div class="w-full">
    //                     <div class="border-b border-gray-200 shadow">
    //                         <table class="divide-y divide-gray-300 ">
    //                             <tbody class="bg-white divide-y divide-gray-300">
    //                                 <tr class="whitespace-nowrap">
    //                                     <td class="border px-16 py-4 text-sm text-gray-500">
    //                                         {i+1}
    //                                     </td>
    //                                     <td class="border px-32 py-4">
    //                                         <div class="text-sm text-gray-900">
    //                                             {track.name}
    //                                         </div>
    //                                     </td>
    //                                     <td class="border px-32 py-4">
    //                                         <div class="text-sm text-gray-500">{track.artist.name}</div>
    //                                     </td>
    //                                     <td class="border px-16 py-4 text-sm text-gray-500">
    //                                     <Link className="text-sm text-blue-900" to={`../media/${track.name}/${track.artist.name}`}>Details</Link>
    //                                     </td>
    //                                 </tr>
    //                             </tbody>
    //                         </table>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // })
    // console.log("TOPTRACKS", topTracks)
    return(
        // <div className="mb-10">
        //     <h1 className="text-5xl font-bold p-5">Top 50 Trending Songs</h1>
        //     <div class="container flex justify-center mx-auto">
        //         <div class="flex flex-col">
        //             <div class="w-full">
        //                 <div class="border-b border-gray-200 shadow">
        //                     <table class="divide-y divide-gray-300 ">
        //                         <thead class="bg-blue-400">
        //                             <tr>
        //                                 <th class="border px-16 text-xs text-gray-500">
        //                                     #
        //                                 </th>
        //                                 <th class="border px-32 py-2 text-xs text-gray-500">
        //                                     Name
        //                                 </th>
        //                                 <th class="border px-32 py-2 text-xs text-gray-500">
        //                                     Artist
        //                                 </th>
        //                                 <th class="border px-16 py-2 text-xs text-gray-500">
        //                                     Info
        //                                 </th>
        //                             </tr>
        //                         </thead>
        //                         <tbody>
        //                             <tr>
        //                                 <td>{topTracks}</td>
        //                             </tr>
        //                         </tbody>
        //                         </table>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     {/* <h4>{topTracks}</h4> */}
                
        // </div>

       <div>
        <h1 className="text-5xl font-bold p-5">Top 50 Trending Songs</h1>
        <div class="container justify-center mx-auto">
            <div class="flex flex-col">
                <table>
                    <thead class="bg-blue-400">
                        <tr class="border">
                            <th class="border">#</th>
                            <th class="border">Title</th>
                            <th class="border">Artist</th>
                            <th class="border">Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.trending.map((track, i) => {
                            return(
                                <tr key={`track${i}`} class="border even:bg-blue-200 odd:bg-blue-50">
                                    <td class="border">{i+1}</td>
                                    <td class="border">{track.name}</td>
                                    <td class="border">{track.artist.name}</td>
                                    <td class="border"><Link className="text-sm text-blue-900" to={`../media/${track.name}/${track.artist.name}`}>Details</Link></td>
                                </tr>
                            )}
                        )}  
                    </tbody>
                </table>
            </div>   
        </div>     
       </div>        
        
    )
}

