import type { TTranslationModel } from '../types';
import { REVOX_LITE } from './revox-lite';
import { REVOX_PRO } from './revox-pro';
import { REVOX_ULTRA } from './revox-ultra';

export const VOICES_REGISTRY: Record<string, TTranslationModel> = {
	revoxLite: REVOX_LITE,
	revoxPro: REVOX_PRO,
	revoxUltra: REVOX_ULTRA,
};
