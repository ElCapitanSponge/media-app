import Plex from "@/services/plex.ts"
import { plex_libs, plex_movies } from "@/services/plex.interfaces.ts"
import { useEffect, useState } from "react"

const Movies = () => {
    const [lib_response, set_lib_response] = useState<undefined | plex_libs>(undefined)
    const [movies_id, set_movies_id] = useState<undefined | number>(undefined)
    const [movies, set_movies] = useState<undefined | plex_movies>(undefined)

    const lib_get = async () => {
        if (lib_response) {
            return lib_response
        }

        const response = await Plex.libraries_get()
        const data = await response.json() as plex_libs
        set_lib_response(data)
        return lib_response
    }

    useEffect(() => {
        lib_get()
            .then(() => {
                if (
                    undefined !== lib_response &&
                    undefined === movies_id
                ) {
                    lib_response.MediaContainer.Directory.forEach(itm => {
                        if ("movie" === itm.type) {
                            set_movies_id(parseInt(itm.key))
                        }
                    })
                }
            })
            .then(() => {
                if (undefined !== movies_id) {
                    Plex.movies_get(movies_id)
                        .then(response => response.json())
                        .then((result: plex_movies) => {
                            set_movies(result)
                        })
                        .catch(error => console.error(error))
                }
            })
            .catch(error => console.error(error))
    })

    return (
        <h1>Movies</h1>
    )
}

export default Movies
