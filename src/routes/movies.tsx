import { Card, CardHeader } from "@/components/ui/card"
import { useAppDispatch } from "@/hooks.ts"
import useGetMovies from "@/lib/helpers/getMovies"
import { setPageTitle } from "@/slices/pageTitle"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Movies = () => {
	const params = useParams<{ libraryId: string }>()
	const libraryId = params.libraryId ?? ""
	const dispatch = useAppDispatch()
	const movies = useGetMovies(libraryId)
	const [content, setContent] = useState<JSX.Element | null>(<></>)

	dispatch(setPageTitle("Movies"))

	useEffect(() => {
		if (movies.length === 0) {
			setContent(<>No movies found</>)
		} else {
			setContent(<>
				<div className="flex flex-wrap justify-around">
					{movies.map(record =>
						<Card
							key={record.movie.key}
							className="mb-4 w-1/4 mx-1 overflow-hidden"
						>
							<CardHeader>
								{record.movie.title}
							</CardHeader>
						</Card>
					)}
				</div>
			</>)
		}
	}, [movies, setContent])

	return (
		<>
			{content}
		</>
	)
}

export default Movies
