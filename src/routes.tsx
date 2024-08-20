import { createBrowserRouter } from "react-router-dom"
import Root from "@/routes/root.tsx"
import ErrorPage from "./error-page"
import type { Router as RemixRouter } from "@remix-run/router"

const routes: RemixRouter = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />
	}
])

export default routes
