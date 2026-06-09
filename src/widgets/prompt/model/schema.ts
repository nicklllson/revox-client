import z from 'zod';
import { AVAILABLE_LANGUAGES } from '@/entities/video';

const VIDEO_ID_REGEX = /^[\w-]{11}$/;
const YOUTUBE_REGEX = /^(www\.|m\.)/;
const YOUTUBE_SHORTS_REGEX = /^\/(?:shorts|embed|v|live)\/([\w-]+)/;

const isValidVideoId = (id: string | null | undefined): id is string =>
	!!id && VIDEO_ID_REGEX.test(id);

export const extractYoutubeId = (value: string): string | null => {
	let url: URL;

	try {
		url = new URL(value.trim());
	} catch {
		return null;
	}

	if (url.protocol !== 'http:' && url.protocol !== 'https:') {
		return null;
	}

	const host = url.hostname.replace(YOUTUBE_REGEX, '');

	if (host === 'youtu.be') {
		const id = url.pathname.slice(1).split('/')[0];
		return isValidVideoId(id) ? id : null;
	}

	if (host === 'youtube.com') {
		if (url.pathname === '/watch') {
			const id = url.searchParams.get('v');
			return isValidVideoId(id) ? id : null;
		}

		const match = url.pathname.match(YOUTUBE_SHORTS_REGEX);
		if (match) {
			return isValidVideoId(match[1]) ? match[1] : null;
		}
	}

	return null;
};

const languageValues = AVAILABLE_LANGUAGES.map(l => l.value) as [
	string,
	...string[],
];

export const promptSchema = z.object({
	videoUrl: z
		.string()
		.refine(
			value => extractYoutubeId(value) !== null,
			'Enter correct url to YouTube video или Shorts',
		),
	language: z.enum(languageValues),
	params: z.record(z.string(), z.unknown()).default({}),
});

export type TPromptField = z.infer<typeof promptSchema>;
