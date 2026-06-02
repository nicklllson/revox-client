import type { YouTubeProps } from 'react-youtube';

export const PLAYER_OPTIONS: YouTubeProps['opts'] = {
	playerVars: {
		rel: 0,
		modestbranding: 1,
		iv_load_policy: 3,
	},
};
