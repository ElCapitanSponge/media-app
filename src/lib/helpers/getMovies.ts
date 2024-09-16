import { useAppDispatch, useAppSelector } from "@/hooks.ts"
import { useGetMovieLibraryQuery } from "@/services/plex.ts"
import {
	createUpdateMovieCollectionFull,
	getMoviesForLibrary,
	MoviesStruct
} from "@/slices/movies.ts"

const useGetMovies = (libraryId: string): MoviesStruct[] => {
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

	return getMoviesForLibrary(movies, libraryId)
}

export default useGetMovies
