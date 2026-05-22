import type { TSubscriptionTier } from '@/entities/subscription';

export const TIER_ACCENTS: Record<
	TSubscriptionTier,
	{
		hue: string;
		soft: string;
		solid: string;
	}
> = {
	FREE: {
		hue: 'rgba(255,255,255,0.55)',
		soft: 'rgba(255,255,255,0.06)',
		solid: '#9aa3ad',
	},
	PRO: { hue: '#5b9dff', soft: 'rgba(91,157,255,0.14)', solid: '#3b82f6' },
	PREMIUM: { hue: '#f5c26b', soft: 'rgba(245,194,107,0.13)', solid: '#e8a93b' },
} as const;
