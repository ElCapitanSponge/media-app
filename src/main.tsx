import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { RouterProvider } from "react-router-dom"
import routes from "./routes.tsx"
import { Provider } from "react-redux"
import { store } from "./store.ts"

const dom = document.getElementById("root")

if (null !== dom) {
	ReactDOM.createRoot(dom).render(
		<React.StrictMode>
			<Provider store={store}>
				<RouterProvider router={routes} />
			</Provider>
		</React.StrictMode>,
	)
}
