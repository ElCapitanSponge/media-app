import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { useAppDispatch } from "@/hooks.ts"
import useGetMovies from "@/lib/helpers/getMovies"
import { setPageTitle } from "@/slices/pageTitle"
import { Eye } from "lucide-react"
import { useParams } from "react-router-dom"

const Movies = () => {
	const params = useParams<{ libraryId: string }>()
	const libraryId = params.libraryId ?? ""
	const dispatch = useAppDispatch()
	const movies = useGetMovies(libraryId)

	dispatch(setPageTitle("Movies"))

	return (
		<>
			<div className="flex flex-wrap justify-around">
				{movies.map(record => {
					console.log(record.movie.key)
					const key = record.movie.key.split("/").pop()
					const link = `/movies/${libraryId}/${key}`
					return (
						<Card
							key={record.movie.key}
							className="mb-4 w-1/4 mx-1 overflow-hidden"
						>
							<CardHeader>
								{record.movie.title}
							</CardHeader>
							<CardFooter>
								<Button
									variant="ghost"
									onClick={() => {
										window.location.href = link
									}}
								>
									<Eye />
								</Button>
							</CardFooter>
						</Card>
					)
				})}
			</div>
		</>
	)
}

export default Movies
