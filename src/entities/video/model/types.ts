import type { AVAILABLE_LANGUAGES } from './languages';

export type TVideo = {
	id: string;
	title?: string;
	externalJobId: string;
	thumbnail?: string;
	language: string;
	videoUrl: string;
	createdAt?: string | Date;
	youtubeVideoId: string;
};

export type TCreateVideoDto = Omit<
	TVideo,
	'id' | 'title' | 'externalJobId' | 'thumbnail' | 'createdAt'
>;

export type TUpdateVideoDto = Partial<
	Omit<TVideo, 'id' | 'externalJobId' | 'createdAt' | 'videoUrl'> & {
		videoId: string;
	}
>;

export type TVideosParams = {
	search?: string;
	take?: number;
};

export type AvailableLanguage = (typeof AVAILABLE_LANGUAGES)[number]['value'];
export type LanguageOption = (typeof AVAILABLE_LANGUAGES)[number];
