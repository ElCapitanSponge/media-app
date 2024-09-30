import path from "path"
import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
	import.meta.env = loadEnv(mode, process.cwd())
	await import("./src/env.ts")
	return {
		plugins: [
			react()
		],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			}
		}
	}
})
