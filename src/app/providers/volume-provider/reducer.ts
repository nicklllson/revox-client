export const STORAGE_KEY = 'volume';

export type TVolumeState = {
	playerVolume: number;
	dubbingVolume: number;
};

export type TVolumeAction =
	| { type: 'SET_PLAYER_VOLUME'; payload: number }
	| { type: 'SET_DUBBING_VOLUME'; payload: number }
	| { type: 'TOGGLE_MUTE'; target: 'player' | 'dubbing' };

export const getInitialState = (): TVolumeState => {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored
			? JSON.parse(stored)
			: { playerVolume: 75, dubbingVolume: 75 };
	} catch {
		return { playerVolume: 75, dubbingVolume: 75 };
	}
};

export const initialState: TVolumeState = {
	playerVolume: 75,
	dubbingVolume: 75,
};

export const volumeReducer = (
	state: TVolumeState,
	action: TVolumeAction,
): TVolumeState => {
	switch (action.type) {
		case 'SET_PLAYER_VOLUME':
			return { ...state, playerVolume: action.payload };
		case 'SET_DUBBING_VOLUME':
			return { ...state, dubbingVolume: action.payload };
		case 'TOGGLE_MUTE':
			return {
				...state,
				...(action.target === 'player' && {
					playerVolume:
						state.playerVolume !== 0 ? 0 : initialState.playerVolume,
				}),
				...(action.target === 'dubbing' && {
					dubbingVolume:
						state.dubbingVolume !== 0 ? 0 : initialState.dubbingVolume,
				}),
			};
		default:
			return state;
	}
};
