import type { TTranslationModel } from '../types';
import { ATLAS_PRO } from './atlas-pro';
import { WHISPER_ONE } from './whisper-one';
import { WHISPER_TWO } from './whisper-two';

export const VOICES_REGISTRY: Record<string, TTranslationModel> = {
	whisperOne: WHISPER_ONE,
	whisperTwo: WHISPER_TWO,
	atlasPro: ATLAS_PRO,
};
