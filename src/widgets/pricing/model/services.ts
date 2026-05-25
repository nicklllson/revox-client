import type { TTier, TTierFeatures } from '@/entities/subscription';
import { FEATURE_LABELS, PROVIDER_LABELS } from './constants';

export const formatUsd = (cents: number): string => {
	const dollars = cents / 100;
	return dollars % 1 === 0 ? dollars.toString() : dollars.toFixed(2);
};

export const buildFeaturesList = (
	tier: TTier,
	freeTier: TTier | undefined,
): string[] => {
	const items: string[] = [];

	items.push(`Up to ${tier.maxVideoLengthMinutes} minutes per video`);

	(Object.keys(tier.features) as Array<keyof TTierFeatures>).forEach(key => {
		const enabled = tier.features[key];

		const isPositive = key === 'watermark' ? !enabled : enabled;
		const freeHasIt = freeTier
			? key === 'watermark'
				? !freeTier.features[key]
				: freeTier.features[key]
			: false;

		if (isPositive && !freeHasIt) {
			items.push(FEATURE_LABELS[key]);
		}
	});

	// Premium providers that aren't available on FREE
	if (freeTier) {
		const extraTranslators = tier.availableTranslators.filter(
			p => !freeTier.availableTranslators.includes(p),
		);
		const extraTts = tier.availableTtsProviders.filter(
			p => !freeTier.availableTtsProviders.includes(p),
		);
		const extraWhisper = tier.availableWhisperModels.filter(
			p => !freeTier.availableWhisperModels.includes(p),
		);

		[...extraTranslators, ...extraTts, ...extraWhisper].forEach(p => {
			if (PROVIDER_LABELS[p]) items.push(PROVIDER_LABELS[p]);
		});
	}

	return items;
};
