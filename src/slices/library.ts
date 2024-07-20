import { PlexLibrary } from "@/lib/types/plexLibrary"
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
export default librarySlice.reducer
