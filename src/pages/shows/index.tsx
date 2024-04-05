import Plex, { plex_base } from "@/services/plex.ts"
import { IPlexLibs, IPlexContext, IPlexShows } from "@/services/plex.interfaces.ts"
import { useContext, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import { PlexContext } from "@/services/plex.context"

const Shows = () => {
    const {
        libs,
        shows_id,
        setShowsId,
        updateLib,
        updateShows
    } = useContext(PlexContext) as IPlexContext

    function show_display() {
        if (undefined === libs.shows) {
            return ""
        }

        return libs.shows.MediaContainer.Metadata.map(show => {
            const img_src = `${plex_base}${show.thumb}?X-Plex-Token=${import.meta.env.VITE_PLEX_TOKEN}`
            const tmp_splt = show.key.split("/")
            const show_id = tmp_splt[tmp_splt.length - 2]
            const show_link = `/shows/${show_id}`

            return (
                <Card key={show_id} className="w-1/5 mb-4">
                    <CardHeader>
                        <CardTitle className="text-ellipsis overflow-hidden w-full text-nowrap">
                            {show.title}
                        </CardTitle>
                        <CardDescription>
                            <Badge>
                                {show.contentRating}
                            </Badge>
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
                            <Link to={show_link}>
                                <ChevronRight className="mr-2"></ChevronRight>View More
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            )
        })
    }

    const lib_get = async () => {
        if (libs.libraries) {
            return libs.libraries
        }

        const response = await Plex.librariesGet()
        const data = await response.json() as IPlexLibs
        updateLib(data)
        return libs.libraries
    }

    useEffect(() => {
        lib_get()
            .then(() => {
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
                if (
                    undefined !== shows_id &&
                    undefined === libs.shows
                ) {
                    Plex.libraryGet(shows_id)
                        .then(response => response.json())
                        .then((result: IPlexShows) => {
                            updateShows(result)
                        })
                        .catch(error => console.error(error))
                }
            })
            .catch(error => console.error(error))
    })

    return (
        <>
            <h1 className="text-6xl flex justify-center mb-6 mt-6">Shows Collection</h1>
            <div className="flex flex-wrap justify-evenly gap-1">
                {show_display()}
            </div>
        </>
    )
}

export default Shows
