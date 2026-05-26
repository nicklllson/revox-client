import {
	createContext,
	type PropsWithChildren,
	useContext,
	useState,
} from 'react';
import { useSession } from '@/entities/auth';
import {
	type TTranslationModel,
	VOICES_REGISTRY,
} from '@/entities/translation';

const STORAGE_KEY = 'revox:selected-model';

const getInitialModel = (isLoggedIn: boolean): TTranslationModel => {
	const models = Object.values(VOICES_REGISTRY);

	if (!isLoggedIn) return models[0]; // Revox lite for logged out models

	const savedId = localStorage.getItem(STORAGE_KEY);
	return models.find(m => m.modelId === savedId) ?? models[0];
};

type TModelContext = {
	setActiveModel: (model: TTranslationModel) => void;
	activeModel: TTranslationModel;
};

export const ModelContext = createContext<TModelContext | null>(null);

export const ModelProvider = ({ children }: PropsWithChildren) => {
	const { session } = useSession();
	const [activeModel, setActiveModelState] = useState<TTranslationModel>(() =>
		getInitialModel(!!session),
	);

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
