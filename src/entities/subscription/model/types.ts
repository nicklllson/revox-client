export type TSubscriptionTier = 'FREE' | 'PRO' | 'PREMIUM';

export type TSubscriptionStatus =
	| 'ACTIVE'
	| 'CANCELLED'
	| 'EXPIRED'
	| 'PENDING';

export type TTierFeatures = {
	multiSpeaker: boolean;
	voiceSelection: boolean;
	watermark: boolean;
	priorityQueue: boolean;
};

export type TTier = {
	tier: TSubscriptionTier;
	name: string;
	description: string;
	priceUsd: number;
	creditsPerMonth: number;
	maxVideoLengthMinutes: number;
	features: TTierFeatures;
	availableTranslators: string[];
	availableTtsProviders: string[];
	availableWhisperModels: string[];
};

export type TCurrentSubscription = {
	tier: TSubscriptionTier;
	status: TSubscriptionStatus;
	creditsUsed: number;
	periodEnd: string;
};

export type TCurrentTierInfo = {
	subscription: TCurrentSubscription;
	config: TTier;
	creditsRemaining: number;
};

export type TCreatePaymentResponse = {
	paymentId: string;
	confirmationUrl: string;
};
