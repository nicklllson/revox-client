export type TSubscriptionTier = 'FREE' | 'PRO' | 'PREMIUM';

export type TSubscriptionStatus =
	| 'ACTIVE'
	| 'CANCELLED'
	| 'EXPIRED'
	| 'PENDING';

export type TSubscriptionEventType =
	| 'CREATED'
	| 'UPGRADED'
	| 'DOWNGRADED'
	| 'RENEWED'
	| 'CANCELED'
	| 'REACTIVATED'
	| 'EXPIRED';

export type TPaymentStatus =
	| 'PENDING'
	| 'WAITING_FOR_CAPTURE'
	| 'SUCCEEDED'
	| 'CANCELED';

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
	cancelAtPeriodEnd: boolean;
	canceledAt: string | null;
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

export type TSubscriptionHistoryEntry = {
	id: string;
	eventType: TSubscriptionEventType;
	tier: TSubscriptionTier;
	paymentId: string | null;
	metadata: Record<string, unknown> | null;
	createdAt: string;
	payment: {
		id: string;
		amount: number;
		currency: string;
		status: TPaymentStatus;
		createdAt: string;
	} | null;
};
