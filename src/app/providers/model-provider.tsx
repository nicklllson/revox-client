import {
	createContext,
	type PropsWithChildren,
	useContext,
	useState,
} from 'react';
import {
	AVAILABLE_MODELS,
	type TTranslationModel,
} from '@/entities/translation-models';

type TModelContext = {
	setActiveModel: (model: TTranslationModel) => void;
	activeModel: TTranslationModel;
};

export const ModelContext = createContext<TModelContext | null>(null);

export const ModelProvider = ({ children }: PropsWithChildren) => {
	const [activeModel, setActiveModel] = useState<TTranslationModel>(
		AVAILABLE_MODELS[0],
	);

	return (
		<ModelContext.Provider value={{ activeModel, setActiveModel }}>
			{children}
		</ModelContext.Provider>
	);
};

export const useModel = () => {
	const ctx = useContext(ModelContext);
	if (!ctx) {
		throw new Error('useModel must be in ModelContext');
	}
	return ctx;
};
