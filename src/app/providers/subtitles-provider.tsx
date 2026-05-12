import { createContext, type ReactNode, useContext, useState } from 'react';

type SubtitlesContextValue = {
	isOpen: boolean;
	toggle: () => void;
};

const SubtitlesContext = createContext<SubtitlesContextValue | null>(null);

export const SubtitlesProvider = ({ children }: { children: ReactNode }) => {
	const [isOpen, setIsOpen] = useState(true);
	const toggle = () => setIsOpen(prev => !prev);

	return (
		<SubtitlesContext.Provider value={{ isOpen, toggle }}>
			{children}
		</SubtitlesContext.Provider>
	);
};

export const useSubtitles = () => {
	const ctx = useContext(SubtitlesContext);
	if (!ctx)
		throw new Error('useSubtitles must be used within SubtitlesProvider');
	return ctx;
};
