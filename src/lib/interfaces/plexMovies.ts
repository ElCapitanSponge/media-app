import { TagIdFilter } from "./plexCommon.ts"

export interface PlexMoviesPayload {
	metadata: PlexMovieCore[]
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

export interface PlexMovieCore {
	Country: {
		tag: TagIdFilter
	}[],
	Genre: {
		tag: TagIdFilter
	}[],
	Role: {
		tag: TagIdFilter
	}[],
	Director: {
		tag: TagIdFilter
	}[],
	Writer: {
		tag: TagIdFilter
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
