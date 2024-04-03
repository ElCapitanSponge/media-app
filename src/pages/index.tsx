import { Button } from "@/components/ui/button.tsx"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import Plex from "@/services/plex.ts"
import { plex_libs, plex_movies, plex_shows } from "@/services/plex.interfaces.ts"
import { ChevronRight, Popcorn, TvIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Index = () => {

    const [lib_response, set_lib_response] = useState<undefined | plex_libs>(undefined)
    const [movies_id, set_movies_id] = useState<undefined | number>(undefined)
    const [shows_id, set_shows_id] = useState<undefined | number>(undefined)
    const [movie_count, set_movie_count] = useState<number>(0)
    const [show_count, set_show_count] = useState<number>(0)

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

                if (
                    undefined !== lib_response &&
                    undefined === shows_id
                ) {
                    lib_response.MediaContainer.Directory.forEach(itm => {
                        if ("show" === itm.type) {
                            set_shows_id(parseInt(itm.key))
                        }
                    })
                }
            })
            .then(() => {
                if (undefined !== movies_id) {
                    Plex.library_get(movies_id)
                        .then(response => response.json())
                        .then((result: plex_movies) => {
                            set_movie_count(result.MediaContainer.size)
                        })
                        .catch(error => console.error(error))
                }

                if (undefined !== shows_id) {
                    Plex.library_get(shows_id)
                        .then(response => response.json())
                        .then((result: plex_shows) => {
                            set_show_count(result.MediaContainer.size)
                        })
                        .catch(error => console.error(error))
                }
            })
            .catch(error => console.error(error))
    })


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

export default Index
