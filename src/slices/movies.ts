import { PlexMovieCore } from "@/lib/interfaces/plexMovies.ts"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface MoviesStruct {
	library: string
	movie: PlexMovieCore
}

export interface MoviesState {
	movies: MoviesStruct[]
}

const initialState: MoviesState = {
	movies: []
}

const moviesSlice = createSlice({
	name: "movies",
	initialState,
	reducers: {
		createUpdateMovieCollection: (
			state,
			action: PayloadAction<{ library: string, movie: PlexMovieCore }>
		) => {
			const index = state.movies
				.findIndex(movieObj => {
					return (
						movieObj.movie.key === action.payload.movie.key &&
						movieObj.library === action.payload.library
					)
				})
			if (index !== -1) {
				if (action.payload !== state.movies[index]) {
					state.movies[index] = action.payload
				}
				return
			}
			state.movies.push(action.payload)
		},
		createUpdateMovieCollectionFull: (
			state,
			action: PayloadAction<{ library: string, movies: PlexMovieCore[] }>
		) => {
			const bulkAdd: MoviesStruct[] = []
			action.payload.movies.forEach(movie => {
				const index = state.movies
					.findIndex(movieObj => {
						return (
							movieObj.movie.key === movie.key &&
							movieObj.library === action.payload.library
						)
					})
				if (index !== -1) {
					if (movie !== state.movies[index].movie) {
						state.movies[index].movie = movie
					}
					return
				}
				bulkAdd.push({
					library: action.payload.library,
					movie
				})
			})

			console.log(bulkAdd)

			state.movies.push(...bulkAdd)
		},
		resetMovies: state => {
			state.movies = []
			return state
		}
	}
})

export const {
	createUpdateMovieCollection,
	createUpdateMovieCollectionFull,
	resetMovies
} = moviesSlice.actions

export const getMoviesForLibraryCount = (
	movies: MoviesStruct[],
	libraryId: string
) => {
	return movies.filter(movie => movie.library === libraryId).length
}

export const getMoviesForLibrary = (
	movies: MoviesStruct[],
	libraryId: string
) => {
	return movies.filter(movie => movie.library === libraryId)
}

export const getMovie = (
	movies: MoviesStruct[],
	libraryId: string,
	movieId: string
) => {
	return movies.find(movie => {
		return (
			movie.library === libraryId &&
			movie.movie.key === movieId
		)
	})
}

export default moviesSlice.reducer
