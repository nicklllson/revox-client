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
	isFavorite: boolean;
	voiceGender: 'male' | 'female';
	voiceName: string;
	voiceStyle: 'neutral' | 'narrator';
	isVertical?: boolean;
};

export type TCreateVideoVoice = {
	gender: string;
	voice_name: string;
	style: string;
};

export type TCreateVideoDto = Omit<
	TVideo,
	| 'id'
	| 'title'
	| 'externalJobId'
	| 'thumbnail'
	| 'createdAt'
	| 'isFavorite'
	| 'youtubeVideoId'
	| 'voiceGender'
	| 'voiceName'
	| 'voiceStyle'
> & {
	voice?: TCreateVideoVoice;
};

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
