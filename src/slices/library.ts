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
		createUpdateLibrary: (state, action: PayloadAction<PlexLibrary>) => {
			const index = state.libraries.findIndex(library => library.key === action.payload.key)
			if (index !== -1) {
				state.libraries[index] = action.payload
				return
			}
			state.libraries.push(action.payload)
		}
	}
})

export const { createUpdateLibrary } = librarySlice.actions
export const selectLibraries = (state: { library: LibraryState }) => {
	return state.library.libraries
}
export default librarySlice.reducer
