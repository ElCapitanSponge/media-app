import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { PlexPayload } from "../lib/interfaces/plexCommon.ts"
import { PlexLibraryPayload } from "../lib/interfaces/plexLibrary.ts"
import { PlexMoviesPayload } from "../lib/interfaces/plexMovies.ts"

export const plexApi = createApi({
	reducerPath: "plexApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5014/plex/" }),
	endpoints: builder => ({
		getLibraries: builder.query<PlexPayload<PlexLibraryPayload>, void>({
			query: () => "libraries"
		}),
		getMovieLibrary: builder.query<PlexPayload<PlexMoviesPayload>, number>({
			query: id => `movies/${id}`
		}),
		getImage: builder.query<string, string>({
			query: path => `image/background/${encodeURIComponent(path)}`,
			transformResponse: (response, _, arg) => {
				const tmpPath: string = arg as unknown as string
				const fileType = tmpPath.split(".").pop()
				const encodedImage = response as unknown as string
				return `data:image/${fileType};base64,${encodedImage}`
			}
		})
	})
})

export const {
	useGetLibrariesQuery,
	useGetMovieLibraryQuery,
	useGetImageQuery
} = plexApi
