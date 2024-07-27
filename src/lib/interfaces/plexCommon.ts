export interface IdPath {
	id: number;
	path: string;
}

export interface PlexPayload<T> {
	mediaContainer: T;
}
