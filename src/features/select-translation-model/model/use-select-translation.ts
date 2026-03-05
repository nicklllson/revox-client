/** biome-ignore-all lint/suspicious/noExplicitAny: Args is unknown */

import { useModel } from '@/app/providers/model-provider';
import type { TTranslationModel } from '@/entities/translation-models';

export const useSelectTranslation = (onSelect?: (...args: any[]) => void) => {
	const { activeModel, setActiveModel } = useModel();

	const handleSelectModel = (model: TTranslationModel) => {
		setActiveModel(model);
		onSelect?.(false);
	};

	return { activeModel, handleSelectModel };
};
