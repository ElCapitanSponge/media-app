import { LibraryType } from "@/lib/enums/plexCommon"

interface LibraryCounterProps {
	libraryId: string,
	type: LibraryType,
	details: boolean
}
export function LibrayCounter (
	{
		libraryId,
		type,
		details = false
	}: LibraryCounterProps
) {
	return <>
		<h4>To Be Implemented</h4>
	</>
}
