import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks.ts"
import { useGetMovieLibraryQuery } from "@/services/plex.ts"
import { LibraryType } from "@/lib/enums/plexCommon.ts"
import { MoviesStruct, createUpdateMovieCollectionFull } from "@/slices/movies.ts"

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
	const [ content, setContent ] = useState(<></>)
	const collection: MoviesStruct[] | null = null

	let data: any = undefined
	let error: boolean = false
	let isLoading: boolean = false

	if (type === LibraryType.Movie) {
		collection = useAppSelector(state => state.movies.movies))
		{ data, error, isLoading } = useGetMovieLibraryQuery(
			parseInt(libraryId)
		)
	}

	if (!error && data !== undefined) {
		dispatch(createUpdateMovieCollectionFull({
			library: libraryId,
			movies: data.mediaContainer.metadata
		}))
	}

	useEffect(() => {
		let libraryCount = -1

		if (type === LibraryType.Movie) {
			libraryCount = (collection as MoviesStruct[])
				.filter(movie => movie.library === libraryId).length
		}

		if (isLoading) {
			setContent(<div>Loading ...</div>)
		} else if (colleaction === undefined || libraryCount < 1) {
			if (details) {
				// TODO: Implement nice formatted message; ie. No Movies Found
			} else {
				setContent(<>0</>)
			}
		} else {
			if (details) {
				// TODO: Implement nice formatted mmessage;  ie. 99 Movies Found
			} else {
				setContent(<>{libraryCount}</>)
			}
		}
	}, [type, details, isLoading, setContent, libraryId, collection])


	return <>
		<h4>To Be Implemented</h4>
	</>
}
