import { Link, createLazyFileRoute } from "@tanstack/react-router"
import Plex, { plex_base } from "@/services/plex.ts"
import { IPlexLibs, IPlexContext, IPlexShows } from "@/services/plex.interfaces.ts"
import { useState, useContext, useEffect, ReactNode, memo } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { to_time } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { PlexContext } from "@/services/plex.context"

const Shows = () => {
    const {
        libs,
        shows_id,
        setShowsId,
        updateLib,
        updateShows
    } = useContext(PlexContext)!

    const [content, setContent] = useState<ReactNode>()

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

        function shows_display(shows: undefined | IPlexShows) {
            if (undefined === shows) {
                return ""
            }

            return shows.MediaContainer.Metadata.map(show => {
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
                                <div className="flex justify-between">
                                    <Badge className="flex">
                                        {show.contentRating}
                                    </Badge>
                                    <Badge className="flex">
                                        {to_time(show.duration)}
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
                                <Link to={show_link}>
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
                    if ("show" === itm.type) {
                        setShowsId(parseInt(itm.key))
                    }
                })
            })
            .then(() => {
                Plex.libraryGet(shows_id!)
                    .then(response => response.json())
                    .then((result: IPlexShows) => {
                        updateShows(result)
                        setContent(shows_display(libs.shows))
                    })
                    .catch(error => console.error(error))
            })
            .then(() => {
                setContent(shows_display(libs.shows))
            })
            .catch(error => console.error(error))
    }, [libs, setShowsId, shows_id, updateShows, updateLib])

    return (
        <>
            <h1 className="text-6xl flex justify-center mb-6 mt-6">Shows Library</h1>
            <div className="flex flex-wrap justify-evenly gap-1">
                {content}
            </div>
        </>
    )
}


export const Route = createLazyFileRoute("/shows")({
    component: memo(Shows)
})
