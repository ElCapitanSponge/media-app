interface IPlexCore {
	MediaContainer: {
		size: number,
		title1: string,
		allowSync: boolean,
	}
}


export interface IPlexLib {

}

export interface IPlexLibs extends IPlexCore {
	MediaContainer: IPlexCore["MediaContainer"] & {
		Directory: IPlexLib[]
	}
}

export interface IPlexMovie {

}

export interface IPlexMovies extends IPlexCore {
	MediaContainer: IPlexCore["MediaContainer"] & {
		Metadata: IPlexMovie[],

	}
}

export interface IPlexShow {
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

export interface IPlexShows extends IPlexCore {
	MediaContainer: IPlexCore["MediaContainer"] & {
		Metadata: IPlexShow[],
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

export interface IPlexState {
	libraries?: IPlexLibs,
	movies?: IPlexMovies,
	shows?: IPlexShows
}

export interface IPlexContext {
	libs: IPlexState
	movies_id: number | undefined
	shows_id: number | undefined
	setMoviesId: (id: number | undefined) => void
	setShowsId: (id: number | undefined) => void
	saveLibs: (libs: IPlexState) => void
	updateLib: (lib: IPlexLibs | undefined) => void
	updateMovies: (movies: IPlexMovies | undefined) => void
	updateShows: (shows: IPlexShows | undefined) => void
}
