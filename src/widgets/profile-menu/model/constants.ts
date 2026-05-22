import type { TSubscriptionTier } from '@/entities/subscription';

export const USER_TIER_COLORS: Record<TSubscriptionTier, string> = {
	FREE: 'border border-green-500',
	PREMIUM: 'border border-blue-800',
	PRO: 'border border-orange-700',
} as const;
