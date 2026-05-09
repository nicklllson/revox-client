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

type TModelContext = {
	setActiveModel: (model: TTranslationModel) => void;
	activeModel: TTranslationModel;
};

export const ModelContext = createContext<TModelContext | null>(null);

export const ModelProvider = ({ children }: PropsWithChildren) => {
	const [activeModel, setActiveModel] = useState<TTranslationModel>(
		Object.values(VOICES_REGISTRY)[0],
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
