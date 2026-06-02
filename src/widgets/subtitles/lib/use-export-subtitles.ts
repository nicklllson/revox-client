import { useState } from 'react';
import type { TSegment } from '@/entities/translation';
import { toSrt } from '../model/services';
import type { TSubLang } from '../model/types';

export const useExportSubtitles = (segments: TSegment[]) => {
	const [downloading, setDownloading] = useState(false);

	const handleExport = (lang: TSubLang) => {
		if (downloading || segments.length === 0) return;
		setDownloading(true);

		try {
			const srt = toSrt(segments, lang);
			const blob = new Blob([srt], { type: 'text/plain;charset=utf-8' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `subtitles_${lang}.srt`;
			document.body.appendChild(a);
			a.click();
			a.remove();
			URL.revokeObjectURL(url);
		} finally {
			setDownloading(false);
		}
	};

	return { handleExport, downloading };
};
