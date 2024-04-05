export const plex_base = `http://${import.meta.env.VITE_PLEX_ADDRESS}:${import.meta.env.VITE_PLEX_PORT}`

const plexHeader = new Headers();
plexHeader.append("Accept", "application/json")
plexHeader.append("X-Plex-Token", import.meta.env.VITE_PLEX_TOKEN as string)

const plexRequestOptions: RequestInit = {
    method: "GET",
    headers: plexHeader,
    redirect: "follow"
}

const plexImageHeader = new Headers()
plexImageHeader.append("X-Plex-Token", import.meta.env.VITE_PLEX_TOKEN as string)

const plexImageRequestOptions: RequestInit = {
    method: "GET",
    headers: plexImageHeader,
    redirect: "follow"
}


const Plex = {
    librariesGet: () => {
        return fetch(`${plex_base}/library/sections/`, plexRequestOptions)
    },
    libraryGet: (lib_id: number) => {
        return fetch(`${plex_base}/library/sections/${lib_id}/all`, plexRequestOptions)
    },
    thumbnailGet: (thumb: string) => {
        if ("/" !== Array.from(thumb)[0]) {
            thumb = `/${thumb}`
        }
        return fetch(`${plex_base}${thumb}`, plexImageRequestOptions)
    }
}

export default Plex

