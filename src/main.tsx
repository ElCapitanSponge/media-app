import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { RouterProvider } from "react-router-dom"
import routes from "./routes.tsx"
import { Provider } from "react-redux"
import configureStore from "./store.ts"

const dom = document.getElementById("root")
const store = configureStore()

if (null !== dom) {
	ReactDOM.createRoot(dom).render(
		<React.StrictMode>
			<Provider store={store}>
				<RouterProvider router={routes} />
			</Provider>
		</React.StrictMode>,
	)
}
