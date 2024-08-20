import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "../ui/card.tsx"
import { useEffect, useState } from "react"
import { Clapperboard } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/hooks.ts"
import { useGetMovieLibraryQuery } from "@/services/plex.ts"
import { createUpdateMovieCollectionFull } from "@/slices/movies.ts"

interface LibraryMovieCardProps {
	libraryId: string,
	title: string,
	description: string,
	iconSize: number
}

export function LibraryCardMovie(
	{
		libraryId,
		title,
		description,
		iconSize,
		...props
	}: LibraryMovieCardProps
) {
	const [content, setContent] = useState<JSX.Element | null>(<></>)
	const movies = useAppSelector(state => state.movies.movies)
	const dispatch = useAppDispatch()

	const image = <Clapperboard size={iconSize} className="flex-none" />

	const { data, error, isLoading } = useGetMovieLibraryQuery(
		parseInt(libraryId)
	)

	if (!error && data !== undefined) {
		dispatch(createUpdateMovieCollectionFull({
			library: libraryId,
			movies: data.mediaContainer.metadata
		}))
	}


	useEffect(() => {
		const movieCount = movies
			.filter(movie => movie.library === libraryId).length
		if (isLoading) {
			setContent(<div>Loading...</div>)
		} else if (movies === undefined || movieCount === 0) {
			setContent(<div>No movies</div>)
		} else {
			setContent(<div>{movieCount} movies</div>)
		}
	}, [movies, isLoading, setContent, libraryId])

	return (
		<Card {...props}>
			<CardHeader>
				<CardTitle className="flex gap-4">{image} {title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>{content}</CardContent>
		</Card>
	)
}
