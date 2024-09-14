import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks.ts"
import { useGetMovieLibraryQuery } from "@/services/plex.ts"
import { createUpdateMovieCollectionFull } from "@/slices/movies.ts"
import { CounterContentProps } from "@/lib/interfaces/plexCommon"

const MovieCounter = (
	{
		libraryId,
		details = false
	}: CounterContentProps
) => {
	const [content, setContent] = useState<JSX.Element | null>(<></>)
	const movies = useAppSelector(state => state.movies.movies)
	const dispatch = useAppDispatch()

	const { data, error, isLoading } = useGetMovieLibraryQuery(
		parseInt(libraryId)
	)

	if (!error && data !== undefined) {
		dispatch(createUpdateMovieCollectionFull({
			library: libraryId,
			movies: data.mediaContainer.metadata
		}))
	}


	useEffect(() => {
		const movieCount = movies
			.filter(movie => movie.library === libraryId).length
		if (isLoading) {
			setContent(<div>Loading...</div>)
		} else if (movies === undefined || movieCount === 0) {
			setContent(<div>{details ? "No Movies" : "-"}</div>)
		} else {
			setContent(<div>{movieCount}{details ? " movies" : ""}</div>)
		}
	}, [movies, isLoading, setContent, libraryId, details])

	return (
		<>
			{content}
		</>
	)
}

export default MovieCounter
