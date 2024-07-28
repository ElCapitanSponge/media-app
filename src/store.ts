import { configureStore } from "@reduxjs/toolkit"
import libraryReducer from "./slices/library.ts"
import { plexApi } from "./services/plex.ts"

export const store = configureStore({
	reducer: {
		libraries: libraryReducer,
		[plexApi.reducerPath]: plexApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(plexApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
