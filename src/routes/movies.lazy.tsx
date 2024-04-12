import { Link, createLazyFileRoute } from "@tanstack/react-router"
import Plex, { plex_base } from "@/services/plex.ts"
import { IPlexLibs, IPlexContext, IPlexMovies } from "@/services/plex.interfaces.ts"
import { useState, useContext } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { to_time } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { PlexContext } from "@/services/plex.context"

const Movies = () => {
    const {
        libs,
        movies_id,
        setMoviesId,
        updateLib,
        updateMovies
    } = useContext(PlexContext) as IPlexContext

    const [content, setContent] = useState(movies_display(libs.movies))

    const lib_get = async () => {
        if (libs.libraries) {
            return libs.libraries
        }

        const response = await Plex.librariesGet()
        const data = await response.json() as IPlexLibs
        updateLib(data)
        return libs.libraries
    }

    function movies_display(movies: undefined | IPlexMovies) {
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

    lib_get()
        .then(() => {
            libs.libraries?.MediaContainer.Directory.forEach(itm => {
                if ("movie" === itm.type) {
                    setMoviesId(parseInt(itm.key))
                }
            })
        })
        .then(() => {
            Plex.libraryGet(movies_id!)
                .then(response => response.json())
                .then((result: IPlexMovies) => {
                    updateMovies(result)
                    setContent(movies_display(libs.movies))
                })
                .catch(error => console.error(error))
        })
        .then(() => {
            setContent(movies_display(libs.movies))
        })
        .catch(error => console.error(error))

    return (
        <>
            <h1 className="text-6xl flex justify-center mb-6 mt-6">Movie Collection</h1>
            <div className="flex flex-wrap justify-evenly gap-1">
                {content}
            </div>
        </>
    )
}

export const Route = createLazyFileRoute("/movies")({
    component: Movies
})
