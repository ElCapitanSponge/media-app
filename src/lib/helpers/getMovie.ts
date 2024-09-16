import { useAppDispatch, useAppSelector } from "@/hooks.ts"
import { useGetMovieLibraryQuery } from "@/services/plex.ts"
import { createUpdateMovieCollectionFull, getMovie } from "@/slices/movies.ts"

const useGetMovie = (libraryId: string, movieId: string) => {
	const movies = useAppSelector(state => state.movies.movies)
	const dispatch = useAppDispatch()

	const { data, error } = useGetMovieLibraryQuery(
		parseInt(libraryId)
	)

	if (!error && data !== undefined) {
		dispatch(createUpdateMovieCollectionFull({
			library: libraryId,
			movies: data.mediaContainer.metadata
		}))
	}

	return getMovie(movies, libraryId, movieId)
}

export default useGetMovie
