import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import ErrorPage from "./error-page"
import type { Router as RemixRouter } from "@remix-run/router"

const routes: RemixRouter = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />
	}
])

export default routes
