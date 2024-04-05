import { plex_lib_context } from "./plex.interfaces"

export type plex_context = {
    lib: plex_lib_context | undefined,
    setLib: (lib: plex_lib_context | undefined) => void
}
