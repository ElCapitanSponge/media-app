import { FC, ReactNode, createContext, useState } from "react"
import { IPlexState, IPlexLibs, IPlexContext, IPlexMovies, IPlexShows } from "./plex.interfaces.ts"

export const PlexContext = createContext<IPlexContext | null>(null)

const PlexProvider: FC<{
    children: ReactNode
}> = ({ children }) => {
    const [libs, setLibs] = useState<IPlexState>({
        libraries: undefined,
        movies: undefined,
        shows: undefined
    })
    const [ moviesId, moviesIdSet ] = useState<number | undefined>(undefined)
    const [ showsId, showsIdSet ] = useState<number | undefined>(undefined)

    const saveLibs = (libs: IPlexState) => {
        setLibs(libs)
    }

    const updateLib = (lib: IPlexLibs | undefined) => {
        const tmp_libs = libs
        tmp_libs.libraries = lib
        setLibs(tmp_libs)
    }

    const updateMovies = (movies: IPlexMovies | undefined) => {
        const tmp_libs = libs
        tmp_libs.movies = movies
        setLibs(tmp_libs)
    }

    const updateShows = (shows: IPlexShows | undefined) => {
        const tmp_libs = libs
        tmp_libs.shows = shows
        setLibs(tmp_libs)
    }

    return (
        <PlexContext.Provider value={{
            libs,
            movies_id: moviesId,
            shows_id: showsId,
            setMoviesId: moviesIdSet,
            setShowsId: showsIdSet,
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
