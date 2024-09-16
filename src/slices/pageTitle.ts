import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = ""

const pageTitleSlice = createSlice({
	name: "pageTitle",
	initialState,
	reducers: {
		setPageTitle: (state, action: PayloadAction<string>) => {
			state = action.payload
			window.document.title = `${state} | Plex Media Browser`
			return state
		}
	}
})

export const {
	setPageTitle,
} = pageTitleSlice.actions

export default pageTitleSlice.reducer
