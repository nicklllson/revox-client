import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useReducer,
	useRef,
} from 'react';
import type YouTube from 'react-youtube';
import { useGetPlayerTime } from '@/entities/player';
import { useVolume } from '../volume-provider';
import {
	initialState,
	playerReducer,
	type TPlayerAction,
	type TPlayerState,
} from './reducer';

type PlayerContextValue = {
	state: TPlayerState;
	dispatch: React.Dispatch<TPlayerAction>;
	playerRef: React.RefObject<YouTube | null>;
	getPlayer: () => YT.Player;
	playerTimeRef: React.RefObject<number>;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(playerReducer, initialState);

	const playerRef = useRef<YouTube | null>(null);
	const playerTimeRef = useRef<number>(0);

	const { state: volumeState } = useVolume();

	const getPlayer = useCallback(
		() => playerRef.current?.getInternalPlayer(),
		[],
	);

	useEffect(() => {
		const player: YT.Player = getPlayer();
		player?.setVolume(volumeState.playerVolume);
	}, [volumeState.playerVolume]);

	useGetPlayerTime(playerRef, playerTimeRef, {
		isEnabled: state.isPlaying,
	});

	return (
		<PlayerContext.Provider
			value={{ state, dispatch, playerRef, playerTimeRef, getPlayer }}>
			{children}
		</PlayerContext.Provider>
	);
};

export const usePlayer = () => {
	const context = useContext(PlayerContext);
	if (!context) throw new Error('usePlayer must be used within PlayerProvider');
	return context;
};
