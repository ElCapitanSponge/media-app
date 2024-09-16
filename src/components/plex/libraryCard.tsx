import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "../ui/card.tsx"
import { LibraryType } from "@/lib/enums/plexCommon.ts"
import { HTMLAttributes, Suspense, useEffect, useState } from "react"
import { Clapperboard, Eye, Music, Tv } from "lucide-react"
import LibraryCounter from "./libraryCounter.tsx"
import { Button } from "../ui/button.tsx"

interface LibraryCardProps extends HTMLAttributes<HTMLDivElement> {
	libraryId: string,
	title: string,
	description: string,
	type: LibraryType
}

const LibraryCard = (
	{
		libraryId,
		title,
		description,
		type,
		...props
	}: LibraryCardProps
) => {
	const iconSize = 24
	const [image, setImage] = useState<JSX.Element | null>(<></>)
	const [link, setLink] = useState<JSX.Element | null>(<></>)

	useEffect(() => {
		switch (type) {
			case LibraryType.Music:
				setImage(<Music size={iconSize} className="flex-none" />)
				setLink(
					<Button
						variant="ghost"
						size="sm"
						className="flex-none"
						onClick={() => {
							window.location.href = `/audio/${libraryId}`
						}}>
						<Eye />
					</Button>
				)
				break
			case LibraryType.Show:
				setImage(<Tv size={iconSize} className="flex-none" />)
				setLink(
					<Button
						variant="ghost"
						size="sm"
						className="flex-none"
						onClick={() => {
							window.location.href = `/shows/${libraryId}`
						}}>
						<Eye />
					</Button>
				)
				break
			case LibraryType.Movie:
				setImage(<Clapperboard size={iconSize} className="flex-none" />)
				setLink(
					<Button
						variant="ghost"
						size="sm"
						className="flex-none"
						onClick={() => {
							window.location.href = `/movies/${libraryId}`
						}}>
						<Eye />
					</Button>
				)
				break
		}
	}, [type, setImage, iconSize, libraryId, title, setLink])

	return (
		<Card {...props}>
			<CardHeader>
				<CardTitle className="flex gap-4">{image} {title}</CardTitle>
				<CardDescription>{
					description
						.replace("artist", "Audio")
						.replace("show", "Shows")
						.replace("movie", "Movies")
				}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex justify-between">
					<Suspense fallback={<div>Loading...</div>}>
						<LibraryCounter
							libraryId={libraryId}
							type={type}
							details={true}
						/>
					</Suspense>
					{link}
				</div>
			</CardContent>
		</Card>
	)
}

export default LibraryCard
