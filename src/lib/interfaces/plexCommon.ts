export interface IdPath {
	id: number,
	path: string
}

export interface TagIdFilter {
	tag: string,
	id?: number,
	filter?: string
}

export interface PlexPayload<T> {
	mediaContainer: T;
}

export interface CounterContentProps {
	libraryId: string,
	details?: boolean
}
