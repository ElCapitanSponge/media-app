import { useAppDispatch } from "@/hooks.ts"
import { setPageTitle } from "@/slices/pageTitle"

const Movies = () => {
	const dispatch = useAppDispatch()

	dispatch(setPageTitle("Movies"))

	return (
		<>
			<p>Here are some movies</p>
		</>
	)
}

export default Movies
