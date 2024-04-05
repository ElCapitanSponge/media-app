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
    const [movie, setMovie] = useState<plex_movie | undefined>(undefined)

    const lib_get = async () => {
        if (libs.libraries) {
            return libs.libraries
        }

        const response = await Plex.libraries_get()
        const data = await response.json() as plex_libs
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
                Plex.library_get(movies_id)
                    .then(response => response.json())
                    .then((result: plex_movies) => {
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

export default Movie
