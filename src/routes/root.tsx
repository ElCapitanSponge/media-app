import { useGetLibrariesQuery } from "@/services/plex.ts"
import { useAppDispatch, useAppSelector } from "@/hooks.ts"
import { createUpdateLibrary } from "@/slices/library.ts"
import LibraryCard from "@/components/plex/libraryCard.tsx"
import { useEffect, useState } from "react"
import { setPageTitle } from "@/slices/pageTitle.ts"

const Root = () => {
	const libraries = useAppSelector(state => state.libraries.libraries)
	const dispatch = useAppDispatch()
	const { data, error, isLoading } = useGetLibrariesQuery()
	const [content, setContent] = useState<JSX.Element | null>(<></>)


	if (!error) {
		data?.mediaContainer.directory.map(library => {
			dispatch(createUpdateLibrary(library))
		})
	}

	useEffect(() => {
		if (isLoading) {
			setContent(<div>Loading...</div>)
		} else if (libraries.length === 0) {
			setContent(<>No libraries found</>)
		} else if (libraries.length > 0) {
			dispatch(setPageTitle("Libraries"))
			setContent(<>
				<div className="flex flex-wrap justify-around">
					{libraries.map(library =>
						<LibraryCard
							key={library.uuid}
							title={library.title}
							description={library.type}
							type={library.type}
							libraryId={library.key}
							className="mb-4 w-1/4"
						/>
					)}
				</div>
			</>)
		} else {
			setContent(<></>)
		}
	}, [setContent, libraries, isLoading, dispatch])

	return (
		<>
			<div>
				{content}
			</div>
		</>
	)
}

export default Root
