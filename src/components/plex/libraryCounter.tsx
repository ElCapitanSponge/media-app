import { LibraryType } from "@/lib/enums/plexCommon"
import { MoviesStruct } from "@/slices/movies"

interface LibraryCounterProps {
	libraryId: string,
	type: LibraryType,
	details: boolean
}
export function LibraryCounter(
	{
		libraryId,
		type,
		details = false
	}: LibraryCounterProps
) {
	const movies: MoviesStruct[] | null = null
	const shows: null = null
	const audio: null = null

	return <>
		<h4>To Be Implemented</h4>
	</>
}
