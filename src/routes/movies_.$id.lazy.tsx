import { createLazyFileRoute } from "@tanstack/react-router"
import Plex from "@/services/plex"
import { PlexContext } from "@/services/plex.context"
import { IPlexLibs, IPlexContext, IPlexMovie, IPlexMovies } from "@/services/plex.interfaces"
import { useContext, useState } from "react"

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
                <h1>{ movie.title }</h1>
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
                undefined !== movies_id &&
                undefined === libs.movies
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
                undefined !== id &&
                undefined === movie
            ) {
                const tmp_movie = libs.movies?.MediaContainer.Metadata.find((movies) => {
                    if (movies.key.endsWith(id)) {
                        return movies
                    }
                })
                if (undefined !== tmp_movie) {
                    setMovie(tmp_movie)
                }
            }
        })
        .catch(error => console.error(error))

    return (
        <>
            { movie_disp() }
        </>
    )
}

export const Route = createLazyFileRoute("/movies/$id")({
    component: Movie
})
