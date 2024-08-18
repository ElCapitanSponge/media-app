import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "../ui/card.tsx"
import { Tv } from "lucide-react"

interface LibraryShowCardProps {
	libraryId: string,
	title: string,
	description: string,
	iconSize: number
}

export function LibraryCardShow(
	{
		libraryId,
		title,
		description,
		iconSize,
		...props
	}: LibraryShowCardProps
) {
	const content = <>No Shows Found</>
	const image = <Tv size={iconSize} className="flex-none" />

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
