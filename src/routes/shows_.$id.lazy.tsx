import Plex from "@/services/plex"
import { PlexContext } from "@/services/plex.context"
import { IPlexContext, IPlexLibs, IPlexShow, IPlexShows } from "@/services/plex.interfaces"
import { createLazyFileRoute } from "@tanstack/react-router"
import { ReactNode, memo, useContext, useEffect, useState } from "react"

const Show = () => {
    const id = parseInt(Route.useParams().id as string)
    const {
        libs,
        shows_id,
        setShowsId,
        updateLib,
        updateShows
    } = useContext(PlexContext) as IPlexContext
    const [show, setShow] = useState<IPlexShow | undefined>(undefined)
    const [details, setDetails] = useState<ReactNode>("")

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

    const show_disp = () => {
        if (undefined === show) {
            return (
                <>
                    <h3>Loading show information...</h3>
                </>
            )
        }

        return (
            <>
                <h1>{show.title}</h1>
            </>
        )
    }

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
                undefined !== shows_id
            ) {
                Plex.libraryGet(shows_id)
                    .then(response => response.json())
                    .then((result: IPlexShows) => {
                        updateShows(result)
                    })
                    .catch(error => console.error(error))
            }
        })
        .then(() => {
            if (
                undefined !== id
            ) {
                const tmp_show = libs.shows?.MediaContainer.Metadata.find((shows) => {
                    const tmp_split = shows.key.split("/")
                    const tmp_id = tmp_split[tmp_split.length - 2]
                    if (tmp_id === id.toString()) {
                        return shows
                    }
                })
                setShow(tmp_show)
                setDetails(show_disp())
            }
        })
        .catch(error => console.error(error))
    }, [id, libs, updateLib, updateShows, setShowsId, show, shows_id])

    return (
        <>
            {details}
        </>
    )
}


export const Route = createLazyFileRoute("/shows/$id")({
    component: memo(Show)
})
