import type { TTranslationModel } from '@/entities/translation';

const TIER_ORDER: Record<TTranslationModel['tier'], number> = {
	FREE: 0,
	PRO: 1,
	PREMIUM: 2,
};

export const isModelAvailable = (
	model: TTranslationModel,
	currentTier: TTranslationModel['tier'] | undefined,
): boolean => {
	if (!currentTier) return false;
	return TIER_ORDER[model.tier] <= TIER_ORDER[currentTier];
};

export const getRequiredTierLabel = (model: TTranslationModel): string => {
	if (model.tier === 'FREE') return 'Free';
	if (model.tier === 'PRO') return 'Pro';
	return 'Premium';
};
