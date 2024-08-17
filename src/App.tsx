import { useGetLibrariesQuery } from "./services/plex.ts"
import { useAppDispatch, useAppSelector } from "./hooks.ts"
import { createUpdateLibrary } from "./slices/library.ts"
import { LibraryCard } from "./components/plex/librayCard.tsx"
import { useEffect, useState } from "react"

const App = () => {
	const libraries = useAppSelector(state => state.libraries.libraries)
	const dispatch = useAppDispatch()
	const { data, error, isLoading } = useGetLibrariesQuery()
	const [content, setContent] = useState<JSX.Element | null>(<></>)

	if (!error) {
		data?.mediaContainer.directory.map(library => {
			dispatch(createUpdateLibrary(library))
		})
	}

	console.log(libraries)

	useEffect(() => {
		if (isLoading) {
			setContent(<div>Loading...</div>)
		} else if (libraries.length === 0) {
			setContent(<>No libraries found</>)
		} else if (libraries.length > 0) {
			setContent(<>
				<div className="flex flex-wrap justify-around">
					{libraries.map(library =>
						<LibraryCard
							key={library.key}
							title={library.title}
							thumbnail={library.thumb}
							description={library.type}
							className="mb-4 w-1/4"
						/>
					)}
				</div>
			</>)
		} else {
			setContent(<></>)
		}
	}, [setContent, libraries, isLoading])

	return (
		<>
			<h1>Libraries</h1>
			<div>
				{content}
			</div>
		</>
	)
}

export default App
