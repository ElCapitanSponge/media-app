import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"

const dom = document.getElementById("root")

if (null !== dom) {
	ReactDOM.createRoot(dom).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	)
}
