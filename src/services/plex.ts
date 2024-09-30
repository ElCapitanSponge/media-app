import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { PlexPayload } from "../lib/interfaces/plexCommon.ts"
import { PlexLibraryPayload } from "../lib/interfaces/plexLibrary.ts"
import { PlexMoviesPayload } from "../lib/interfaces/plexMovies.ts"
import { env } from "@/env.ts"

export const plexApi = createApi({
	reducerPath: "plexApi",
	baseQuery: fetchBaseQuery({ baseUrl: env.VITE_API_URL }),
	endpoints: builder => ({
		getLibraries: builder.query<PlexPayload<PlexLibraryPayload>, void>({
			query: () => "libraries"
		}),
		getMovieLibrary: builder.query<PlexPayload<PlexMoviesPayload>, number>({
			query: id => `movies/${id}`
		}),
		getImage: builder.query({
			query: (path: string) => ({
				url: `image/${encodeURIComponent(path)}`,
				responseHandler: async response => {
					const blob = await response.blob()
					return new Blob([blob], { type: "image/jpeg" })
				}
			}),
		}),
	})
})

export const {
	useGetLibrariesQuery,
	useGetMovieLibraryQuery,
	useGetImageQuery
} = plexApi
