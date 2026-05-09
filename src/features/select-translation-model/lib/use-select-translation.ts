/** biome-ignore-all lint/suspicious/noExplicitAny: Args is unknown */

import { useModel } from '@/app/providers/model-provider';
import type { TTranslationModel } from '@/entities/translation';

export const useSelectTranslation = (onSelect?: (...args: any[]) => void) => {
	const { activeModel, setActiveModel } = useModel();

	const handleSelectModel = (model: TTranslationModel, isLocked: boolean) => {
		if (isLocked) return;
		setActiveModel(model);
		onSelect?.(false);
	};

	return { activeModel, handleSelectModel };
};
