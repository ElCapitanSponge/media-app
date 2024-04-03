import Plex, { plex_base } from "@/services/plex.ts"
import { plex_libs, plex_movies } from "@/services/plex.interfaces.ts"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { to_time } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

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

    function movies_display() {
        if (undefined === movies) {
            return ""
        }

        return movies.MediaContainer.Metadata.map(movie => {
            const img_src = `${plex_base}${movie.thumb}?X-Plex-Token=${import.meta.env.VITE_PLEX_TOKEN}`
            const tmp_splt = movie.key.split("/")
            const movie_id = tmp_splt[tmp_splt.length - 1]
            const movie_link = `/movies/${movie_id}`
            return (
                <Card key={movie_id} className="w-1/5 mb-4">
                    <CardHeader>
                        <CardTitle className="text-ellipsis overflow-hidden w-full text-nowrap">
                            {movie.title}
                        </CardTitle>
                        <CardDescription>
                            <div className="flex justify-between">
                                <Badge className="flex">
                                    {movie.contentRating}
                                </Badge>
                                <Badge className="flex">
                                    {to_time(movie.duration)}
                                </Badge>
                            </div>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <img
                            src={img_src}
                            className="aspect-auto h-56 ml-auto mr-auto"
                        />
                    </CardContent>
                    <CardFooter>
                        <Button asChild>
                            <Link to={movie_link}>
                                <ChevronRight className="mr-2"></ChevronRight>View More
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            )
        })
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
                    Plex.library_get(movies_id)
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
        <>
            <h1 className="text-6xl flex justify-center mb-6 mt-6">Movie Collection</h1>
            <div className="flex flex-wrap justify-evenly gap-1">
                {movies_display()}
            </div>
        </>
    )
}

export default Movies
