import { FC, ReactNode, createContext, useState } from "react"
import { Iplex_libs, plex_libs, plex_libs_context, plex_movies, plex_shows } from "./plex.interfaces.ts"

export const PlexContext = createContext<plex_libs_context | null>(null)

const PlexProvider: FC<{
    children: ReactNode
}> = ({ children }) => {
    const [libs, setLibs] = useState<Iplex_libs>({
        libraries: undefined,
        movies: undefined,
        shows: undefined
    })
    const [ movies_id, movies_id_set ] = useState<number | undefined>(undefined)
    const [ shows_id, shows_id_set ] = useState<number | undefined>(undefined)

    const saveLibs = (libs: Iplex_libs) => {
        setLibs(libs)
    }

    const updateLib = (lib: plex_libs | undefined) => {
        const tmp_libs = libs
        tmp_libs.libraries = lib
        setLibs(tmp_libs)
    }

    const updateMovies = (movies: plex_movies | undefined) => {
        const tmp_libs = libs
        tmp_libs.movies = movies
        setLibs(tmp_libs)
    }

    const updateShows = (shows: plex_shows | undefined) => {
        const tmp_libs = libs
        tmp_libs.shows = shows
        setLibs(tmp_libs)
    }

    return (
        <PlexContext.Provider value={{
            libs,
            movies_id,
            shows_id,
            setMoviesId: movies_id_set,
            setShowsId: shows_id_set,
            saveLibs,
            updateLib,
            updateMovies,
            updateShows
        }}>
            {children}
        </PlexContext.Provider>
    )
}

export default PlexProvider
