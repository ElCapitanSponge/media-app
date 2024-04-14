import Plex from "@/services/plex"
import { PlexContext } from "@/services/plex.context"
import { IPlexLibs, IPlexShow, IPlexShows } from "@/services/plex.interfaces"
import { createLazyFileRoute } from "@tanstack/react-router"
import { ReactNode, memo, useContext, useEffect, useState } from "react"

const Show = () => {
    const id = parseInt(Route.useParams().id)
    const {
        libs,
        shows_id,
        setShowsId,
        updateLib,
        updateShows
    } = useContext(PlexContext)!
    const [show, setShow] = useState<IPlexShow | undefined>(undefined)
    const [details, setDetails] = useState<ReactNode>("")
    const [showDetails, setShowDetails] = useState()

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

        const episodesGet = async (type: string, title: string, key: string) => {}

        const show_disp = () => {
            if (undefined === show || undefined === showDetails) {
                return (
                    <>
                        <h3>Loading show information...</h3>
                    </>
                )
            }

            console.log("show", show)
            console.log("show details", showDetails)

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
                    const tmp_show = libs.shows?.MediaContainer.Metadata
                        .find(shows => {
                            const tmp_split = shows.key.split("/")
                            const tmp_id = tmp_split[tmp_split.length - 2]
                            if (tmp_id === id.toString()) {
                                return shows
                            }
                        })
                    setShow(tmp_show)
                }
            })
            .then(() => {
                if (undefined !== show?.key) {
                    Plex.contentGet(show.key)
                        .then(response => response.json())
                        .then(result => setShowDetails(result))
                        .catch(error => console.error(error))
                }
            })
            .then(() => setDetails(show_disp()))
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
