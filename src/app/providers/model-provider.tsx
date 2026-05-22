import {
	createContext,
	type PropsWithChildren,
	useContext,
	useState,
} from 'react';
import {
	type TTranslationModel,
	VOICES_REGISTRY,
} from '@/entities/translation';

const STORAGE_KEY = 'revox:selected-model';

const getInitialModel = (): TTranslationModel => {
	const models = Object.values(VOICES_REGISTRY);
	const savedId = localStorage.getItem(STORAGE_KEY);
	return models.find(m => m.modelId === savedId) ?? models[0];
};

type TModelContext = {
	setActiveModel: (model: TTranslationModel) => void;
	activeModel: TTranslationModel;
};

export const ModelContext = createContext<TModelContext | null>(null);

export const ModelProvider = ({ children }: PropsWithChildren) => {
	const [activeModel, setActiveModelState] = useState<TTranslationModel>(getInitialModel);

	const setActiveModel = (model: TTranslationModel) => {
		localStorage.setItem(STORAGE_KEY, model.modelId);
		setActiveModelState(model);
	};

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
