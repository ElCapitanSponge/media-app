import { PlexLibrary } from "../lib/interfaces/plexLibrary.ts"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface LibraryState {
	libraries: PlexLibrary[]
}

const initialState: LibraryState = {
	libraries: []
}

const librarySlice = createSlice({
	name: "library",
	initialState,
	reducers: {
		addLibrary: (state, action: PayloadAction<PlexLibrary>) => {
			state.libraries.push(action.payload)
		}
	}
})

export const { addLibrary } = librarySlice.actions
export const selectLibraries = (state: { library: LibraryState }) => {
	return state.library.libraries
}
export default librarySlice.reducer
