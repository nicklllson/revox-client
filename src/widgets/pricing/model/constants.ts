import type { TTierFeatures } from '@/entities/subscription';

export const FEATURE_LABELS: Record<keyof TTierFeatures, string> = {
	multiSpeaker: 'Multi-speaker voice detection',
	voiceSelection: 'Voice selection',
	watermark: 'No watermark',
	priorityQueue: 'Priority processing queue',
};

export const PROVIDER_LABELS: Record<string, string> = {
	google: 'Google Translate',
	deepseek: 'DeepSeek (context-aware translation)',
	'edge-tts': 'Edge TTS',
	elevenlabs: 'ElevenLabs (premium voiceover)',
	base: 'Whisper Base',
	'large-v3': 'Whisper Large v3 (accurate transcription)',
};
