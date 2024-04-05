import React, { SetStateAction, useState } from "react"
import {
    createBrowserRouter,
    RouterProvider,
    LoaderFunction,
    ActionFunction,
} from "react-router-dom"
import { plex_context } from "./services/plex.types"

interface RouteCommon {
    loader?: LoaderFunction
    action?: ActionFunction
    ErrorBoundary?: React.ComponentType<unknown>
}

interface IRoute extends RouteCommon {
    path: string
    Element: React.ComponentType<unknown>
}

interface Pages {
    [key: string]: {
        default: React.ComponentType<unknown>
    } & RouteCommon
}

const pages: Pages = import.meta.glob("./pages/**/*.tsx", { eager: true })

const routes: IRoute[] = []
for (const path of Object.keys(pages)) {
    const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1]
    if (!fileName) {
        continue
    }

    const normalizedPathName = fileName.includes("$")
        ? fileName.replace("$", ":")
        : fileName.replace(/\/index/, "")

    routes.push({
        path: fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
        Element: pages[path].default,
        loader: pages[path].loader,
        action: pages[path].action,
        ErrorBoundary: pages[path]?.ErrorBoundary,
    })
}

const router = createBrowserRouter(
    routes.map(({ Element, ErrorBoundary, ...rest }) => ({
        ...rest,
        element: <Element />,
        ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
    }))
)

export const LibraryContext = React.createContext<plex_context | null>(null)

const App = () => {
    const [libraries, setLibrary] =  useState<plex_context>()

    return (
        <LibraryContext.Provider value={{ lib: libraries, setLib: setLibrary }}>
            <RouterProvider router={router} />
        </LibraryContext.Provider>
    )
}

export default App
