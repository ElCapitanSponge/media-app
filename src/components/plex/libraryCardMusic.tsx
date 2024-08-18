import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "../ui/card.tsx"
import { Music } from "lucide-react"

interface LibraryMusicCardProps {
	libraryId: string,
	title: string,
	description: string,
	iconSize: number
}

export function LibraryCardMusic(
	{
		libraryId,
		title,
		description,
		iconSize,
		...props
	}: LibraryMusicCardProps
) {
	const content = <>No Audio Found</>
	const image = <Music size={iconSize} className="flex-none" />

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
