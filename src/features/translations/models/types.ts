import type { TSegment } from '@/entities/translation';

export type TTranslationMessage =
	| { type: 'progress'; stage: string; percent: number; message: string }
	| {
			type: 'metadata';
			session_id: string;
			video_url: string;
			total_chunks: number;
			total_duration: number;
	  }
	| {
			type: 'chunk_meta';
			chunk_id: number;
			segments: TSegment[];
			is_last: boolean;
	  }
	| { type: 'error'; message: string; code: string };
