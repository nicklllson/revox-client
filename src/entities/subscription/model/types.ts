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
	tier: 'FREE' | 'PRO' | 'PREMIUM';
	name: string;
	description: string;
	priceUsd: number;
	minutesPerMonth: number;
	maxVideoLengthMinutes: number;
	features: TTierFeatures;
	availableTranslators: string[];
	availableTtsProviders: string[];
	availableWhisperModels: string[];
};

export type TCurrentSubscription = {
	tier: TSubscriptionTier;
	status: TSubscriptionStatus;
	minutesUsed: number;
	periodEnd: string;
};

export type TCurrentTierInfo = {
	subscription: TCurrentSubscription;
	config: TTier;
	minutesRemaining: number;
};

export type TCreatePaymentResponse = {
	paymentId: string;
	confirmationUrl: string;
};
