import { useRouteError } from "react-router-dom"

const ErrorPage = () => {
	const error: Error = useRouteError() as Error
	console.error(error)

	return (
		<div id="error-page">
			<h1>Oops! Something went wrong</h1>
			<p>Sorry, we couldn&apos;t find the page you were looking for.</p>
			<p>
				<i>{error.message}</i>
			</p>
		</div>
	)
}

export default ErrorPage
