import { createSlice } from "@reduxjs/toolkit"

const librarySlice = createSlice({
	name: "library",
	initialState: { libraries: [] },
	reducers: {
		addLibrary: (state, action) => {
			state.libraries.push(action.payload)
		}
	}
})

export const { addLibrary } = librarySlice.actions
export default librarySlice.reducer
