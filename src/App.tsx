import React from "react"
import { useGetLibrariesQuery } from "./services/plex.ts"

const App = () => {

	const { data, error, isLoading } = useGetLibrariesQuery()

	console.log(data)
	console.log(error)
	return (
		<>
			<div>
				{error ? (
					<>Oh no, there was an error</>
				) : isLoading ? (
					<>Loading...</>
				) : data ? (
					<>
						<h1>Libraries</h1>
						<ul>
							{data.payload.map((library) => (
								<li key={library.id}>{library.title}</li>
							))}
						</ul>
					</>
				) : null}
			</div>
		</>
	)
}

export default App
