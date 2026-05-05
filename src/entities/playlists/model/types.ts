import type { TVideo } from '@/entities/video';

export type TPlaylist = {
	id: string;
	name: string;
	createdAt: string;
	userId: string;
	_count?: { items: number };
};

export type TPlaylistItem = {
	id: string;
	playlistId: string;
	videoId: string;
	createdAt: string;
	video: TVideo;
};

export type TPlaylistWithItems = TPlaylist & {
	items: TPlaylistItem[];
};

export type TCreatePlaylistDto = {
	name: string;
};

export type TUpdatePlaylistDto = {
	name?: string;
};
