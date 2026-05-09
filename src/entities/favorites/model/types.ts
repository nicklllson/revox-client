import type { TVideo } from '@/entities/video';

export type TFavoriteVideo = {
	id: string;
	createdAt: string;
	userId: string;
	videoId: string;
	video: TVideo;
	isFavorite: boolean;
};

export type TFavoriteVideoResponse = {
	id: string;
	createdAt: Date;
	userId: string;
	videoId: string;
};
