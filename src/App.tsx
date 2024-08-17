import React from "react"
import { useGetLibrariesQuery } from "./services/plex.ts"
import { useAppDispatch, useAppSelector } from "./hooks.ts"
import { createUpdateLibrary } from "./slices/library.ts"

const App = () => {
	const libraries = useAppSelector(state => state.libraries.libraries)
	const dispatch = useAppDispatch()
	const { data, error, isLoading } = useGetLibrariesQuery()

	if (!error) {
		data?.mediaContainer.directory.map(library => {
			dispatch(createUpdateLibrary(library))
		})
	}

	return (
		<>
			<div>
				{isLoading ?
					<>Loading...</>
				 : libraries.length === 0 ?
						<>No libraries found</>
				 : libraries.length > 0 ?
							<>
								<h1>Libraries</h1>
								<ul>
									{libraries.map(library =>
										<li key={library.key}>{library.title}</li>
									)}
								</ul>
							</>
				 : null}
			</div>
		</>
	)
}

export default App
