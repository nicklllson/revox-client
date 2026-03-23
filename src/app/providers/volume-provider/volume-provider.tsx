import {
	type ActionDispatch,
	createContext,
	type PropsWithChildren,
	useContext,
	useEffect,
	useReducer,
} from 'react';
import {
	getInitialState,
	initialState,
	STORAGE_KEY,
	type TVolumeAction,
	type TVolumeState,
	volumeReducer,
} from './reducer';

type TVolumeContext = {
	state: TVolumeState;
	dispatch: ActionDispatch<[action: TVolumeAction]>;
};

const VolumeContext = createContext<TVolumeContext | null>(null);

export const VolumeProvider = ({ children }: PropsWithChildren) => {
	const [state, dispatch] = useReducer(
		volumeReducer,
		initialState,
		getInitialState,
	);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	}, [state]);

	return (
		<VolumeContext.Provider value={{ dispatch, state }}>
			{children}
		</VolumeContext.Provider>
	);
};

export const useVolume = () => {
	const ctx = useContext(VolumeContext);
	if (ctx === null) throw new Error('useVolume must be in VolumeProvider');
	return ctx;
};
