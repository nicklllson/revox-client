import {
	createContext,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useReducer,
	useRef,
	useState,
} from 'react';
import type YouTube from 'react-youtube';
import { useGetPlayerTime } from '@/entities/player';
import type { TTranslationMessage } from '@/features/translations';
import { useVolume } from '../volume-provider';
import {
	initialState,
	playerReducer,
	type TPlayerAction,
	type TPlayerState,
} from './reducer';

type TChunkMeta = Extract<TTranslationMessage, { type: 'chunk_meta' }>;

type PlayerContextValue = {
	state: TPlayerState;
	dispatch: React.Dispatch<TPlayerAction>;
	playerRef: React.RefObject<YouTube | null>;
	getPlayer: () => YT.Player;
	playerTimeRef: React.RefObject<number>;
	chunkMetas: Map<number, TChunkMeta>;
	setChunkMetas: Dispatch<SetStateAction<Map<number, TChunkMeta>>>;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(playerReducer, initialState);
	const [chunkMetas, setChunkMetas] = useState<Map<number, TChunkMeta>>(
		new Map(),
	);

	const playerRef = useRef<YouTube | null>(null);
	const playerTimeRef = useRef<number>(0);

	const { state: volumeState, dispatch: volumeDispatch } = useVolume();

	const getPlayer = useCallback(
		() => playerRef.current?.getInternalPlayer(),
		[],
	);

	const playerVolumeRef = useRef(volumeState.playerVolume);
	playerVolumeRef.current = volumeState.playerVolume;
	

	const localChangeAtRef = useRef(0);

	useEffect(() => {
		localChangeAtRef.current = Date.now();
		const player: YT.Player = getPlayer();
		player?.setVolume(volumeState.playerVolume);
	}, [volumeState.playerVolume]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (Date.now() - localChangeAtRef.current < 1500) return;
			const player: YT.Player = getPlayer();
			if (!player) return;
			const raw = player.getVolume();
			if (typeof raw !== 'number' || !Number.isFinite(raw)) return;
			const vol = Math.round(Math.max(0, Math.min(100, raw)));
			if (vol !== playerVolumeRef.current) {
				volumeDispatch({ type: 'SET_PLAYER_VOLUME', payload: vol });
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [getPlayer, volumeDispatch]);

	useGetPlayerTime(playerRef, playerTimeRef, {
		isEnabled: state.isPlaying,
	});

	return (
		<PlayerContext.Provider
			value={{
				state,
				dispatch,
				playerRef,
				playerTimeRef,
				getPlayer,
				chunkMetas,
				setChunkMetas,
			}}>
			{children}
		</PlayerContext.Provider>
	);
};

export const usePlayer = () => {
	const context = useContext(PlayerContext);
	if (!context) throw new Error('usePlayer must be used within PlayerProvider');
	return context;
};
