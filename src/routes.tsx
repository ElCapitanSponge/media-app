import { createBrowserRouter } from "react-router-dom"
import Root from "@/routes/root.tsx"
import ErrorPage from "./error-page"
import type { Router as RemixRouter } from "@remix-run/router"
import Movies from "./routes/movies"
import Movie from "./routes/movie"

const routes: RemixRouter = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />
	},
	{
		path: "movies/:libraryId",
		element: <Movies />,
	},
	{
		path: "movies/:libraryId/:movieId",
		element: <Movie />,
	}
])

export default routes
