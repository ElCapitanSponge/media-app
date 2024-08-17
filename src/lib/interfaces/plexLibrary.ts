import { LibraryType } from "../enums/plexCommon"

export interface PlexLibraryPayload {
	directory: PlexLibrary[]
}

export interface PlexLibrary {
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
	type: LibraryType,
	updatedAt: number,
	uuid: string
}
