import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { PlexPayload } from "../lib/interfaces/plexCommon.ts"
import { PlexLibraryPayload } from "../lib/interfaces/plexLibrary.ts"
import { PlexMoviesPayload } from "../lib/interfaces/plexMovies.ts"

export const plexApi = createApi({
	reducerPath: "plexApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5173/plex/" }),
	endpoints: (builder) => ({
		getLibraries: builder.query({
			query: () => "libraries",
			transformResponse: (response: PlexPayload<PlexLibraryPayload>) => response
		}),
		getMovieLibrary: builder.query<PlexPayload<PlexMoviesPayload>, number>({
			query: id => `movies/${id}`
		})
	})
})

export const { useGetLibrariesQuery, useGetMovieLibraryQuery } = plexApi
