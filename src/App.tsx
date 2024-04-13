import { RouterProvider, createRouter } from "@tanstack/react-router"
import PlexProvider from "./services/plex.context"

import { routeTree } from "./routeTree.gen"

const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router
    }
}

const App = () => {
    return (
        <PlexProvider>
            <RouterProvider router={router} />
        </PlexProvider>
    )
}

export default App
