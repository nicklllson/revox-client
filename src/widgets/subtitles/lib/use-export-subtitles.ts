import { useState } from 'react';
import type { TSegment } from '@/entities/translation';
import { toSrt, toTxt } from '../model/services';
import type { TSubLang } from '../model/types';

type TExportFormat = 'srt' | 'txt';

export const useExportSubtitles = (segments: TSegment[]) => {
	const [downloading, setDownloading] = useState(false);

	const handleExport = (lang: TSubLang, format: TExportFormat) => {
		if (downloading || segments.length === 0) return;
		setDownloading(true);

		try {
			const content =
				format === 'srt' ? toSrt(segments, lang) : toTxt(segments, lang);
			const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `subtitles_${lang}.${format}`;
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
