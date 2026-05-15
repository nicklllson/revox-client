import z from 'zod';
import { AVAILABLE_LANGUAGES } from '@/entities/video';

const YOUTUBE_URL_REGEX = /^https:\/\/www\.youtube\.com\/watch\?v=[\w-]+/;
const YOUTUBE_SHORTS_URL_REGEX = /^https:\/\/www\.youtube\.com\/shorts\/[\w-]+/;

const languageValues = AVAILABLE_LANGUAGES.map(l => l.value) as [
	string,
	...string[],
];

export const promptSchema = z.object({
	videoUrl: z
		.string()
		.refine(
			value =>
				YOUTUBE_URL_REGEX.test(value) || YOUTUBE_SHORTS_URL_REGEX.test(value),
			'URL must be YouTube video or Shorts format',
		),
	language: z.enum(languageValues),
	params: z.record(z.string(), z.unknown()).default({}),
});

export type TPromptField = z.infer<typeof promptSchema>;
