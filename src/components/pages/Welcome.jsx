import { useEffect, useState } from "react"

export default function Welcome(props) {
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
	return (
		<div className="text-3xl font-bold underline">
			hello from welcome
		</div>
	)
}