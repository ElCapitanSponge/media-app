import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { TanStackRouterVite } from "@tanstack/router-vite-plugin"

const ReactCompilerConfig = {}
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [
					["babel-plugin-react-compiler", ReactCompilerConfig]
				]
			}
		}),
		TanStackRouterVite(),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		}
	}
})
