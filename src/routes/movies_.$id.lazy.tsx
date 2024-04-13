import { createLazyFileRoute } from "@tanstack/react-router"
import Plex from "@/services/plex"
import { PlexContext } from "@/services/plex.context"
import { IPlexLibs, IPlexContext, IPlexMovie, IPlexMovies } from "@/services/plex.interfaces"
import { ReactNode, memo, useContext, useEffect, useState } from "react"

const Movie = () => {
    const id = parseInt(Route.useParams().id as string)
    const {
        libs,
        movies_id,
        setMoviesId,
        updateLib,
        updateMovies
    } = useContext(PlexContext) as IPlexContext
    const [movie, setMovie] = useState<IPlexMovie | undefined>(undefined)
    const [details, setDetails] = useState<ReactNode>("")

    useEffect(() => {
        const lib_get = async () => {
            if (libs.libraries) {
                return libs.libraries
            }

            const response = await Plex.librariesGet()
            const data = await response.json() as IPlexLibs
            updateLib(data)
            return libs.libraries
        }

        const movie_disp = () => {
            if (undefined === movie) {
                return (
                    <>
                        <h3>Loading movie information...</h3>
                    </>
                )
            }

            return (
                <>
                    <h1>{movie.title}</h1>
                </>
            )
        }

        lib_get()
            .then(() => {
                if (
                    undefined !== libs.libraries &&
                    undefined === movies_id
                ) {
                    libs.libraries.MediaContainer.Directory.forEach(itm => {
                        if ("movie" === itm.type) {
                            setMoviesId(parseInt(itm.key))
                        }
                    })
                }
            })
            .then(() => {
                if (
                    undefined !== movies_id
                ) {
                    Plex.libraryGet(movies_id)
                        .then(response => response.json())
                        .then((result: IPlexMovies) => {
                            updateMovies(result)
                        })
                        .catch(error => console.error(error))
                }
            })
            .then(() => {
                if (
                    undefined !== id
                ) {
                    const tmp_movie = libs.movies?.MediaContainer.Metadata.find((movies) => {
                        if (movies.key.endsWith(id.toString())) {
                            return movies
                        }
                    })
                    setMovie(tmp_movie)
                    setDetails(movie_disp())
                }
            })
            .catch(error => console.error(error))
    }, [id, libs, movie, movies_id, setMoviesId, updateLib, updateMovies])

    return (
        <>
            {details}
        </>
    )
}

export const Route = createLazyFileRoute("/movies/$id")({
    component: memo(Movie)
})
