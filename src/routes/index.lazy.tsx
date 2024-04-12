import { Link, createLazyFileRoute } from "@tanstack/react-router"
import { Button } from "@/components/ui/button.tsx"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import Plex from "@/services/plex.ts"
import { IPlexLibs, IPlexContext, IPlexMovies, IPlexShows } from "@/services/plex.interfaces.ts"
import { ChevronRight, Popcorn, TvIcon } from "lucide-react"
import { useContext, useState } from "react"
import { PlexContext } from "@/services/plex.context"

const Index = () => {
    const {
        libs,
        movies_id,
        shows_id,
        setMoviesId,
        setShowsId,
        updateLib,
        updateMovies,
        updateShows
    } = useContext(PlexContext) as IPlexContext
    const [movie_count, set_movie_count] = useState<number>(0)
    const [show_count, set_show_count] = useState<number>(0)

    const lib_get = async () => {
        if (libs.libraries) {
            return libs.libraries
        }

        const response = await Plex.librariesGet()
        const data = await response.json() as IPlexLibs
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

            if (
                undefined !== libs.libraries &&
                undefined === shows_id
            ) {
                libs.libraries.MediaContainer.Directory.forEach(itm => {
                    if ("show" === itm.type) {
                        setShowsId(parseInt(itm.key))
                    }
                })
            }
        })
        .then(() => {
            if (undefined !== movies_id) {
                Plex.libraryGet(movies_id)
                    .then(response => response.json())
                    .then((result: IPlexMovies) => {
                        updateMovies(result)
                        set_movie_count(result.MediaContainer.size)
                    })
                    .catch(error => console.error(error))
            }

            if (undefined !== shows_id) {
                Plex.libraryGet(shows_id)
                    .then(response => response.json())
                    .then((result: IPlexShows) => {
                        updateShows(result)
                        set_show_count(result.MediaContainer.size)
                    })
                    .catch(error => console.error(error))
            }
        })
        .catch(error => console.error(error))
    return (
        <>
            <h1 className="text-6xl flex justify-center mb-6 mt-6">Plex Library Viewer</h1>
            <div className="flex justify-around">
                <Card className="w-1/3">
                    <CardHeader>
                        <CardTitle className="flex">
                            <Popcorn className="mr-2"></Popcorn>Movies
                        </CardTitle>
                        <CardDescription>Your Movie Collection</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {movie_count} Movies found!
                    </CardContent>
                    <CardFooter>
                        <Button asChild>
                            <Link to="/movies">
                                <ChevronRight className="mr-2"></ChevronRight>View Movies
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
                <Card className="w-1/3">
                    <CardHeader>
                        <CardTitle className="flex">
                            <TvIcon className="mr-2"></TvIcon>TV Shows
                        </CardTitle>
                        <CardDescription>Your TV Show Collection</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {show_count} Shows found!
                    </CardContent>
                    <CardFooter>
                        <Button asChild>
                            <Link to="/shows">
                                <ChevronRight className="mr-2"></ChevronRight>View TV Shows
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>

            </div>
        </>
    )
}

export const Route = createLazyFileRoute("/")({
    component: Index
})
