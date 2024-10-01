import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { RouterProvider } from "react-router-dom"
import routes from "./routes.tsx"
import { Provider } from "react-redux"
import { store } from "./store.ts"
import HeaderBar from "./components/common/header.tsx"
import { ClerkProvider } from "@clerk/clerk-react"
import { env } from "./env.ts"

const dom = document.getElementById("root")

if (null !== dom) {
	ReactDOM.createRoot(dom).render(
		<React.StrictMode>
			<Provider store={store}>
				<ClerkProvider publishableKey={env.VITE_CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">
					<HeaderBar />
					<RouterProvider router={routes} />
				</ClerkProvider>
			</Provider>
		</React.StrictMode>,
	)
}
