import type { TStep } from './types';

export const steps: TStep[] = [
	{
		tour: 'onboarding',
		steps: [
			// ─────────────────────────────────────────
			// Знакомство — главная страница
			// ─────────────────────────────────────────
			{
				icon: '👋',
				title: 'Welcome to Revox',
				content:
					'Revox translates and dubs YouTube videos into your language in real time. Let me show you around — it takes 30 seconds.',
				selector: '#onboarding-welcome',
				side: 'bottom',
				showControls: true,
				showSkip: true,
				pointerPadding: 8,
				pointerRadius: 12,
			},

			// ─────────────────────────────────────────
			// Форма создания
			// ─────────────────────────────────────────
			{
				icon: '🔗',
				title: 'Paste a YouTube link',
				content:
					'Drop any YouTube URL here. We support videos up to 30 minutes on the Free plan.',
				selector: '#onboarding-url-input',
				side: 'bottom',
				showControls: true,
				showSkip: true,
				pointerPadding: 6,
				pointerRadius: 8,
			},
			{
				icon: '🌐',
				title: 'Pick a target language',
				content:
					'Choose what language you want the video translated into. Russian, English, Spanish, French, German and more.',
				selector: '#onboarding-language',
				side: 'bottom',
				showControls: true,
				showSkip: true,
				pointerPadding: 6,
				pointerRadius: 8,
			},
			{
				icon: '🤖',
				title: 'Choose a model',
				content:
					'Different models offer different quality. Revox Lite is free and fast. Pro and Ultra deliver premium voiceover with Silero TTS.',
				selector: '#onboarding-model',
				side: 'bottom',
				showControls: true,
				showSkip: true,
				pointerPadding: 6,
				pointerRadius: 8,
			},
			{
				icon: '🎙️',
				title: 'Voice settings',
				content:
					'Pick a voice that fits the video. Some voices are locked behind Pro and Ultra — upgrade to unlock them.',
				selector: '#onboarding-voice',
				side: 'bottom',
				showControls: true,
				showSkip: true,
				pointerPadding: 6,
				pointerRadius: 8,
			},
			{
				icon: '🚀',
				title: 'Start translating',
				content:
					"Hit this button to kick off the translation. You'll see progress in real time.",
				selector: '#onboarding-submit',
				side: 'top',
				showControls: true,
				showSkip: true,
				pointerPadding: 6,
				pointerRadius: 8,
			},

			// ─────────────────────────────────────────
			// Сайдбар — навигация
			// ─────────────────────────────────────────
			{
				icon: '📚',
				title: 'Your videos',
				content:
					'All your translated videos appear here. Click any one to watch it again with full dubbed audio.',
				selector: '#onboarding-sidebar-history',
				side: 'right',
				showControls: true,
				showSkip: true,
				pointerPadding: 6,
				pointerRadius: 8,
			},
			{
				icon: '⭐',
				title: 'Favorites and playlists',
				content:
					'Save your best videos to Favorites or organize them into Playlists for easy access.',
				selector: '#onboarding-sidebar-collections',
				side: 'right',
				showControls: true,
				showSkip: true,
				pointerPadding: 6,
				pointerRadius: 8,
			},
			{
				icon: '💎',
				title: 'Credits and your plan',
				content:
					"This shows how many credits you've used this month. Each translation costs credits based on the model — Lite is the cheapest, Ultra is the priciest but highest quality.",
				selector: '#onboarding-usage-credits',
				side: 'top-left',
				showControls: true,
				showSkip: true,
				pointerPadding: 6,
				pointerRadius: 10,
			},
			{
				icon: '⚙️',
				title: 'Settings & subscription',
				content:
					'Manage your account, view billing history and upgrade your plan from here.',
				selector: '#onboarding-sidebar-settings',
				side: 'top-left',
				showControls: true,
				showSkip: true,
				pointerPadding: 6,
				pointerRadius: 8,
			},

			// ─────────────────────────────────────────
			// Финал
			// ─────────────────────────────────────────
			{
				icon: '🎉',
				title: "You're all set",
				content:
					'Paste a YouTube link to translate your first video. If you ever want to see this tour again, you can re-launch it from settings.',
				selector: '#onboarding-url-input',
				side: 'bottom',
				showControls: true,
				showSkip: false,
				pointerPadding: 8,
				pointerRadius: 8,
			},
		],
	},

	// ─────────────────────────────────────────
	// Отдельный тур для плеера — запускается после
	// первого успешного перевода
	// ─────────────────────────────────────────
	{
		tour: 'player-onboarding',
		steps: [
			{
				icon: '🎬',
				title: 'Your first dubbed video',
				content:
					"The video plays with translated audio synced to the original. Let's see how it works.",
				selector: '#onboarding-player',
				side: 'left',
				showControls: true,
				showSkip: true,
				pointerPadding: 8,
				pointerRadius: 16,
			},
			{
				icon: '🔊',
				title: 'Audio mix',
				content:
					'Slide between the original audio and the dubbed version. Find the balance that works for you.',
				selector: '#onboarding-volume',
				side: 'top',
				showControls: true,
				showSkip: true,
				pointerPadding: 6,
				pointerRadius: 8,
			},
			{
				icon: '⭐',
				title: 'Save your favorites',
				content:
					'Hit the star to add this video to your favorites. Build playlists from your favorite content.',
				selector: '#onboarding-favorite-btn',
				side: 'left',
				showControls: true,
				showSkip: false,
				pointerPadding: 4,
				pointerRadius: 999,
			},
		],
	},
] as const;
