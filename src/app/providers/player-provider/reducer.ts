export type TPlayerState = {
	isPlaying: boolean;
	videoId: string;
	title: string;
	thumbnail: string;
};

export type TPlayerAction =
	| { type: 'SET_PLAYING'; payload: boolean }
	| { type: 'SET_VIDEO_ID'; payload: string }
	| { type: 'SET_TITLE'; payload: string }
	| { type: 'SET_THUMBNAIL'; payload: string };

export const initialState: TPlayerState = {
	isPlaying: false,
	videoId: '', // Only for dev
	title: '',
	thumbnail: '',
};

export const playerReducer = (
	state: TPlayerState,
	action: TPlayerAction,
): TPlayerState => {
	switch (action.type) {
		case 'SET_TITLE':
			return { ...state, title: action.payload };
		case 'SET_THUMBNAIL':
			return { ...state, thumbnail: action.payload };
		case 'SET_PLAYING':
			return { ...state, isPlaying: action.payload };
		case 'SET_VIDEO_ID':
			return { ...state, videoId: action.payload };
		default:
			return state;
	}
};
