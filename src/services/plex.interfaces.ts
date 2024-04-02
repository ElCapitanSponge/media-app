interface plex_core {
    MediaContainer: {
        size: number,
        title1: string,
        allowSync: boolean,
    }
}


export interface plex_lib {
    Location?: {
        id: number,
        path: string
    }[],
    agent: string,
    allowSync: boolean,
    art: string,
    composite: string,
    content: boolean,
    contentChangedAt: number,
    createdAt: number,
    directory: boolean,
    filters: boolean,
    hidden: number,
    key: string,
    language: string,
    refreshing: boolean,
    scannedAt: number,
    scanner: string,
    thumb: string,
    title: string,
    type: string,
    updatedAt: number,
    uuid: string
}

export interface plex_libs extends plex_core {
    MediaContainer: plex_core["MediaContainer"] & {
        Directory: plex_lib[]
    }
}

export interface plex_movie {

}

export interface plex_movies extends plex_core {
    MediaContainer: plex_core["MediaContainer"] & {
        Metadata: plex_movie[],
        art: string,
        identifier: string,
        librarySectionID: number,
        librarySectionTitle: string,
        librarySectionUUID: string,
        mediaTagPrefix: string,
        mediaTagVersion: number,
        thumb: string,
        title2: string,
        viewGroup: string,
        viewMode: number
    }
}

export interface plex_show {

}

export interface plex_shows extends plex_core {
    MediaContainer: plex_core["MediaContainer"] & {
        Metadata: plex_show[],
        art: string,
        identifier: string,
        librarySectionID: number,
        librarySectionTitle: string,
        librarySectionUUID: string,
        mediaTagPrefix: string,
        mediaTagVersion: number,
        thumb: string,
        title2: string,
        viewGroup: string,
        viewMode: number
    }
}
