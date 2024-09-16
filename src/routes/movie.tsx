import { useAppDispatch } from "@/hooks"
import useGetMovie from "@/lib/helpers/getMovie"
import { setPageTitle } from "@/slices/pageTitle"
import { useParams } from "react-router-dom"

const Movie = () => {
	const params = useParams<{ libraryId: string, movieId: string }>()
	const libraryId = params.libraryId ?? ""
	const movieId = params.movieId ?? ""
	const movieKey = `/library/metadata/${movieId}`
	const dispatch = useAppDispatch()
	const movie = useGetMovie(libraryId, movieKey)

	dispatch(setPageTitle(movie?.movie.title ?? ""))

	return (
		<>
			<h1>{movie?.movie.title}</h1>
			<pre>
				{JSON.stringify(movie?.movie, null, 2)}
			</pre>
		</>
	)
}

export default Movie
