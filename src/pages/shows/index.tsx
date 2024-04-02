import Plex from "@/services/plex.ts"
import { plex_libs, plex_shows } from "@/services/plex.interfaces.ts"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const Shows = () => {
    const [lib_response, set_lib_response] = useState<undefined | plex_libs>(undefined)
    const [shows_id, set_shows_id] = useState<undefined | number>(undefined)
    const [shows, set_shows] = useState<undefined | plex_shows>(undefined)

    function show_display() {
        if (undefined === shows) {
            return ""
        }

        return shows.MediaContainer.Metadata.map(show =>
            <Card key={show.index} className="w-1/5 mb-4">
                <CardHeader>
                    <CardTitle>
                        {show.title}
                    </CardTitle>
                    <CardDescription>
                        {show.contentRating}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {show.art}
                </CardContent>
                <CardFooter></CardFooter>
            </Card>
        )
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
                    Plex.shows_get(shows_id)
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
            <h1>Shows</h1>
            <div className="flex flex-wrap justify-evenly gap-1">
                {show_display()}
            </div>
        </>
    )
}

export default Shows
