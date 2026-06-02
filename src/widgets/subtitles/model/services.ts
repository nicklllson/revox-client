import type { TSegment } from '@/entities/translation';
import type { TSubLang } from '../model/types';

export const formatTime = (seconds: number) => {
	const m = Math.floor(seconds / 60);
	const s = Math.floor(seconds % 60);
	return `${m}:${s.toString().padStart(2, '0')}`;
};

const formatSrtTime = (seconds: number): string => {
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	const s = Math.floor(seconds % 60);
	const ms = Math.round((seconds % 1) * 1000);
	return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
};

const getSegmentText = (seg: TSegment, lang: TSubLang): string => {
	if (lang === 'original') return seg.original_text;
	if (lang === 'translated') return seg.translated_text;
	return `${seg.translated_text}\n${seg.original_text}`;
};

export const toSrt = (segments: TSegment[], lang: TSubLang): string => {
	return segments
		.map((seg, i) => {
			const text = getSegmentText(seg, lang);
			return `${i + 1}\n${formatSrtTime(seg.start)} --> ${formatSrtTime(seg.end)}\n${text}`;
		})
		.join('\n\n');
};
