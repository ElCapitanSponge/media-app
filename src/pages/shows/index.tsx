import Plex, { plex_base } from "@/services/plex.ts"
import { plex_libs, plex_shows } from "@/services/plex.interfaces.ts"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

const Shows = () => {
    const [lib_response, set_lib_response] = useState<undefined | plex_libs>(undefined)
    const [shows_id, set_shows_id] = useState<undefined | number>(undefined)
    const [shows, set_shows] = useState<undefined | plex_shows>(undefined)

    function show_display() {
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
                if (undefined !== shows_id) {
                    Plex.library_get(shows_id)
                        .then(response => response.json())
                        .then((result: plex_shows) => {
                            set_shows(result)
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
