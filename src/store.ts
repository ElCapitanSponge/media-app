import { configureStore } from "@reduxjs/toolkit"
import libraryReducer from "./slices/library"

export const store = configureStore({
	reducer: {
		libraries: libraryReducer,
	}
})

export const RootState = ReturnType<typeof store.getState>

export const AppDispatch = typeof store.dispatch
