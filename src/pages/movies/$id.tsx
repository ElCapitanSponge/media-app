import Plex from "@/services/plex"
import { PlexContext } from "@/services/plex.context"
import { plex_libs, plex_libs_context, plex_movie, plex_movies } from "@/services/plex.interfaces"
import { useContext, useState } from "react"
import { useParams } from "react-router-dom"

const Movie = () => {
    const { id } = useParams()
    const {
        libs,
        movies_id,
        setMoviesId,
        updateLib,
        updateMovies
    } = useContext(PlexContext) as plex_libs_context
    const [ movie, setMovie ] = useState<plex_movie | undefined>(undefined)

    const lib_get = async () => {
        if (libs.libraries) {
            return libs.libraries
        }

        const response = await Plex.libraries_get()
        const data = await response.json() as plex_libs
        updateLib(data)
        return libs.libraries
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
                Plex.library_get(movies_id)
                    .then(response => response.json())
                    .then((result: plex_movies) => {
                        updateMovies(result)
                    })
                    .catch(error => console.error(error))
            }
        })
        .then(() => {
            // TODO: Get movie details
        })
        .catch(error => console.error(error))

    return (
        <>
            <div>ID: {id}</div>
        </>
    )
}

export default Movie
