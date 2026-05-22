import { useLayoutEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useModel } from '@/app/providers/model-provider';
import { useSubscription } from '@/entities/subscription';
import type {
	TParamId,
	TParamValues,
} from '@/shared/config/translation-params/model/types';
import { getParamDef } from '@/shared/config/translation-params/registry';

const TIER_ORDER = { FREE: 0, PRO: 1, PREMIUM: 2 } as const;

type Tier = keyof typeof TIER_ORDER;

const isTierSufficient = (
	required: Tier | undefined,
	current: Tier | undefined,
): boolean => {
	if (!required) return true;
	if (!current) return false;
	return TIER_ORDER[current] >= TIER_ORDER[required];
};

export const useTranslationParams = () => {
	const { activeModel } = useModel();
	const { setValue } = useFormContext();
	const { subscription } = useSubscription();
	const currentTier = subscription?.tier as Tier | undefined;

	const paramSlots = activeModel?.params ?? [];

	useLayoutEffect(() => {
		if (!activeModel) return;
		const defaults: TParamValues = {};
		for (const slot of paramSlots) {
			const def = getParamDef(slot.id as TParamId);
			if (def) {
				defaults[slot.id] = def.defaultValue;
			}
		}
		setValue('params', defaults, { shouldDirty: false });
	}, [activeModel?.modelId]);

	const paramDefs = useMemo(
		() =>
			paramSlots
				.map(slot => ({
					slot,
					def: getParamDef(slot.id as TParamId),
					isLocked: !isTierSufficient(
						slot.minTier as Tier | undefined,
						currentTier,
					),
				}))
				.filter(
					(
						x,
					): x is {
						slot: (typeof paramSlots)[0];
						def: NonNullable<ReturnType<typeof getParamDef>>;
						isLocked: boolean;
					} => x.def !== null,
				),
		[paramSlots, currentTier],
	);

	return { paramDefs };
};
