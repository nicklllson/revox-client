import z from 'zod';
import { AVAILABLE_LANGUAGES } from '@/entities/video';

const youtubeUrlRegex = /^https:\/\/www\.youtube\.com\/watch\?v=[\w-]+/;

const languageValues = AVAILABLE_LANGUAGES.map(l => l.value) as [
	string,
	...string[],
];

export const promptSchema = z.object({
	videoUrl: z
		.string()
		.regex(
			youtubeUrlRegex,
			'URL must be YouTube video format (https://www.youtube.com/watch?v=...)',
		),
	language: z.enum(languageValues),
});

export type TPromptField = z.infer<typeof promptSchema>;
