export const plex_base = `http://${import.meta.env.VITE_PLEX_ADDRESS}:${import.meta.env.VITE_PLEX_PORT}`

const plex_header = new Headers();
plex_header.append("Accept", "application/json")
plex_header.append("X-Plex-Token", import.meta.env.VITE_PLEX_TOKEN as string)

const plex_request_options: RequestInit = {
    method: "GET",
    headers: plex_header,
    redirect: "follow"
}

const plex_image_header = new Headers()
plex_image_header.append("X-Plex-Token", import.meta.env.VITE_PLEX_TOKEN as string)

const plex_image_request_options: RequestInit = {
    method: "GET",
    headers: plex_image_header,
    redirect: "follow"
}


const Plex = {
    libraries_get: () => {
        return fetch(`${plex_base}/library/sections/`, plex_request_options)
    },
    library_get: (lib_id: number) => {
        return fetch(`${plex_base}/library/sections/${lib_id}/all`, plex_request_options)
    },
    thumbnail_get: (thumb: string) => {
        if ("/" !== Array.from(thumb)[0]) {
            thumb = `/${thumb}`
        }
        return fetch(`${plex_base}${thumb}`, plex_image_request_options)
    }
}

export default Plex

