import { useEffect, useState } from "react"
import { LibraryType } from "@/lib/enums/plexCommon.ts"
import MovieCounter from "./movieCounter.tsx"
import ShowCounter from "./showCounter.tsx"
import MusicCounter from "./musicCounter.tsx"

interface LibraryCounterProps {
	libraryId: string,
	type: LibraryType,
	details: boolean
}

const LibraryCounter = (
	{
		libraryId,
		type,
		details = false
	}: LibraryCounterProps
) => {
	const [content, setContent] = useState<JSX.Element | null>(<></>)

	useEffect(() => {
		if (type === LibraryType.Movie) {
			setContent(<MovieCounter libraryId={libraryId} details={details} />)
		} else if (type === LibraryType.Show) {
			setContent(<ShowCounter libraryId={libraryId} details={details} />)
		} else if (type === LibraryType.Music) {
			setContent(<MusicCounter libraryId={libraryId} details={details} />)
		} else {
			setContent(<></>)
		}
	}, [type, setContent, libraryId, details])

	return <>
		{content}
	</>
}

export default LibraryCounter
