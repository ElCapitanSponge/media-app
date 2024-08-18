import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "../ui/card.tsx"
import { LibraryType } from "@/lib/enums/plexCommon.ts"
import { LibraryCardMovie } from "./libraryCardMovie.tsx"
import { LibraryCardMusic } from "./libraryCardMusic.tsx"
import { LibraryCardShow } from "./libraryCardShow.tsx"

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

	return (
		type === LibraryType.Movie ?
			<LibraryCardMovie
				libraryId={libraryId}
				title={title}
				description={description}
				iconSize={iconSize}
				{...props}
			/> :
			type === LibraryType.Music ?
				<LibraryCardMusic
					libraryId={libraryId}
					title={title}
					description={description}
					iconSize={iconSize}
					{...props}
				/> :
				type === LibraryType.Show ?
					<LibraryCardShow
						libraryId={libraryId}
						title={title}
						description={description}
						iconSize={iconSize}
						{...props}
					/> :
					<Card {...props}>
						<CardHeader>
							<CardTitle className="flex gap-4">{title}</CardTitle>
							<CardDescription>{description}</CardDescription>
						</CardHeader>
						<CardContent>{content}</CardContent>
					</Card>
	)
}
