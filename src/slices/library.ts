import { LibraryType } from "@/lib/enums/plexCommon.ts"
import { PlexLibrary } from "../lib/interfaces/plexLibrary.ts"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface LibraryState {
	libraries: PlexLibrary[]
}

const initialState: LibraryState = {
	libraries: []
}

const libraryFilter = (libraries: PlexLibrary[], type: LibraryType) => {
	return libraries.filter(library => {
		return library.type === type
	})
}

const librarySlice = createSlice({
	name: "library",
	initialState,
	reducers: {
		createUpdateLibrary: (state, action: PayloadAction<PlexLibrary>) => {
			const index = state.libraries
				.findIndex(library => library.key === action.payload.key)
			if (index !== -1) {
				if (action.payload !== state.libraries[index]) {
					state.libraries[index] = action.payload
				}
				return
			}
			state.libraries.push(action.payload)
		},
	}
})

export const {
	createUpdateLibrary
} = librarySlice.actions
export const selectLibraries = (state: { library: LibraryState }) => {
	return state.library.libraries
}
export const getMovieLibraries = (state: { library: LibraryState }) => {
	return libraryFilter(
		state.library.libraries,
		LibraryType.Movie
	)
}
export const getShowLibraries = (state: { library: LibraryState }) => {
	return libraryFilter(
		state.library.libraries,
		LibraryType.Show
	)
}
export const getMusicLibraries = (state: { library: LibraryState }) => {
	return libraryFilter(
		state.library.libraries,
		LibraryType.Music
	)
}
export default librarySlice.reducer
