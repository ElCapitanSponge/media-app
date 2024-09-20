import { useGetImageQuery } from "@/services/plex"
import { useEffect, useState } from "react"

interface PlexImageProps {
	path: string,
	altText?: string
}

const PlexImage = ({
	path,
	altText = "plex image"
}: PlexImageProps) => {
	const { data, error, isLoading } = useGetImageQuery(path)
	const [content, setContent] = useState<JSX.Element | null>(<></>)

	useEffect(() => {
		if (isLoading) {
			setContent(<div>Loading...</div>)
		} else if (error) {
			setContent(<div>Error getting image</div>)
		} else {
			const img = URL.createObjectURL(data)
			setContent(<img src={img} alt={altText} />)
		}
	}, [altText, data, isLoading, setContent])

	return (
		<>
			{content}
		</>
	)
}

export default PlexImage
