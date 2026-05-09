import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useModel } from '@/app/providers/model-provider';
import type {
	TParamId,
	TParamValues,
} from '@/shared/config/translation-params/model/types';
import { getParamDef } from '@/shared/config/translation-params/registry';

export const useTranslationParams = () => {
	const { activeModel } = useModel();
	const { setValue } = useFormContext();

	const paramSlots = activeModel?.params ?? [];

	useEffect(() => {
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
				}))
				.filter(
					(
						x,
					): x is {
						slot: (typeof paramSlots)[0];
						def: NonNullable<ReturnType<typeof getParamDef>>;
					} => x.def !== null,
				),
		[paramSlots],
	);

	return { paramDefs };
};
