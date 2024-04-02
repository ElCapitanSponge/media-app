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
    Country: {
        tag: string
    }[],
    Genre: {
        tag: string
    }[],
    Role: {
        tag: string
    }[],
    Director: {
        tag: string
    }[],
    Writer: {
        tag: string
    }[],
    Media: {
        Part: {
            audioProfile: string,
            container: string,
            duration: number,
            file: string,
            has64bitOffsets: boolean,
            size: number,
            videoProfile: string
        }[],
        aspectRatio: number,
        audioChannels: number,
        audioCodec: string,
        audioProfile: string,
        bitrate: number,
        container: string,
        duration: number,
        has64bitOffsets: boolean,
        height: number,
        id: number,
        optimizedForStreaming: number,
        videoCodec: string,
        videoFrameRate: string,
        videoProfile: string,
        videoResolution: string,
        width: number
    }[],
    addedAt: number,
    art: string,
    audienceRating: number,
    audienceRatingImage: string,
    childCount: number,
    contentRating: string,
    duration: number,
    guid: string,
    index: number,
    key: string,
    leafCount: number,
    originallyAvailableAt: string | Date,
    ratingKey: string,
    studio: string,
    summary: string,
    tagline: string,
    theme: string,
    thumb: string,
    title: string,
    type: string,
    updatedAt: number,
    viewedLeafCount: number,
    year: number
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
    Country: {
        tag: string
    }[],
    Genre: {
        tag: string
    }[],
    Role: {
        tag: string
    }[],
    addedAt: number,
    art: string,
    audienceRating: number,
    audienceRatingImage: string,
    childCount: number,
    contentRating: string,
    duration: number,
    guid: string,
    index: number,
    key: string,
    leafCount: number,
    originallyAvailableAt: string | Date,
    ratingKey: string,
    studio: string,
    summary: string,
    tagline: string,
    theme: string,
    thumb: string,
    title: string,
    type: string,
    updatedAt: number,
    viewedLeafCount: number,
    year: number
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
