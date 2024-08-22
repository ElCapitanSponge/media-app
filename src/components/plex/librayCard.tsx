import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "../ui/card.tsx"
import { LibraryType } from "@/lib/enums/plexCommon.ts"
import { Suspense, useEffect, useState } from "react"
import { Clapperboard, Music, Tv } from "lucide-react"
import { LibrayCounter } from "./libraryCounter.tsx"

interface LibraryCardProps {
	libraryId: string,
	title: string,
	description: string,
	type: LibraryType
}

export function LibraryCard(
	{
		libraryId,
		title,
		description,
		type,
		...props
	}: LibraryCardProps
) {
	const iconSize = 24
	const [image, setImage] = useState<JSX.Element | null>(<></>)

	useEffect(() => {
		switch (type) {
			case LibraryType.Music:
				setImage(<Music size={iconSize} className="flex-none" />)
				break
			case LibraryType.Show:
				setImage(<Tv size={iconSize} className="flex-none" />)
				break
			case LibraryType.Movie:
				setImage(<Clapperboard size={iconSize} className="flex-none" />)
				break
		}
	}, [type, setImage, iconSize])

	return (
		<Card {...props}>
			<CardHeader>
				<CardTitle className="flex gap-4">{image} {title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<Suspense fallback={<div>Loading...</div>}>
					<LibrayCounter
						libraryId={libraryId}
						type={type}
						details={true}
					/>
				</Suspense>
			</CardContent>
		</Card>
	)
}
