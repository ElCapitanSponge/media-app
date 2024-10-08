import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import libraryReducer from "./slices/library.ts"
import moviesReducer from "./slices/movies.ts"
import pageTitleReducer from "./slices/pageTitle.ts"
import { plexApi } from "./services/plex.ts"

export const store = configureStore({
	reducer: {
		pageTitle: pageTitleReducer,
		libraries: libraryReducer,
		movies: moviesReducer,
		[plexApi.reducerPath]: plexApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(plexApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
