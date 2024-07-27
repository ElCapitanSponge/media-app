import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PlexPayload } from "../lib/interfaces/plexCommon"
import { PlexLibraryPayload } from "../lib/interfaces/plexLibrary"

export const plexApi = createApi({
	reducerPath: "plexApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7019/plex/" }),
	endpoints: (builder) => ({
		getLibraries: builder.query<PlexPayload<PlexLibraryPayload>, null>({
			query: () => "libraries"
		}),
		getMovieLibrary: builder.query<PlexPayload<PlexLibraryPayload>, number>({
			query: id => `movies/${id}`
		})
	})
})
