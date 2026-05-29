import { createBrowserRouter } from 'react-router';
import { ROUTES } from '@/shared/model/routes';

import { AuthLayout } from '../layouts/auth-layout';
import { BannerLayout } from '../layouts/banner-layout';
import { HistoryLayout } from '../layouts/history-layout';
import { MainLayout } from '../layouts/main-layout';
import { App } from '../ui/app';
import { ProtectedRoute, protectedLoader } from './protected-route';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/auth',
				element: <AuthLayout />,
				children: [
					{
						path: ROUTES.PUBLIC.SIGNUP,
						lazy: () => import('@/pages/public/sign-up.page'),
					},
					{
						path: ROUTES.PUBLIC.SIGNIN,
						lazy: () => import('@/pages/public/sign-in.page'),
					},
					{
						path: ROUTES.PUBLIC.PASSWORD,
						lazy: () => import('@/pages/public/password.page'),
					},
					{
						path: ROUTES.PUBLIC.CONFIRM,
						lazy: () => import('@/pages/public/confirmation-code.page'),
					},
				],
			},
			{
				path: ROUTES.PUBLIC.RESET_PASSWORD,
				lazy: () => import('@/pages/public/reset-password.page'),
			},
			{
				path: ROUTES.PUBLIC.NEW_PASSWORD,
				lazy: () => import('@/pages/public/new-password.page'),
			},
			{
				path: ROUTES.PUBLIC.AUTH_CALLBACK,
				lazy: () => import('@/pages/public/auth-callback.page'),
			},
			{
				Component: ProtectedRoute,
				loader: protectedLoader,
				path: ROUTES.PRIVATE.PAYMENT,
				lazy: () => import('@/pages/private/payment.page'),
			},
			{
				element: <MainLayout />,
				children: [
					{
						path: ROUTES.PUBLIC.PRICING,
						lazy: () => import('@/pages/public/pricing.page'),
					},
					{
						element: <HistoryLayout />,
						children: [
							{
								path: ROUTES.PUBLIC.HOME,
								lazy: () => import('@/pages/public/home.page'),
							},
							{
								Component: ProtectedRoute,
								loader: protectedLoader,
								children: [
									{
										path: ROUTES.PRIVATE.VIDEO,
										lazy: () => import('@/pages/private/video.page'),
									},
									{
										path: ROUTES.PRIVATE.SETTINGS,
										lazy: () => import('@/pages/private/settings.page'),
									},
									{
										path: ROUTES.PRIVATE.SINGLE_PLAYLIST,
										lazy: () =>
											import(
												'@/pages/private/playlists.page/single-playlist.page'
											),
									},
									{
										element: <BannerLayout />,
										children: [
											{
												path: ROUTES.PRIVATE.FAVORITES,
												lazy: () => import('@/pages/private/favorites.page'),
											},
											{
												path: ROUTES.PRIVATE.PLAYLISTS,
												lazy: () => import('@/pages/private/playlists.page'),
											},
											{
												path: ROUTES.PRIVATE.SUBSCRIPTION,
												lazy: () => import('@/pages/private/subscription.page'),
											},
										],
									},
								],
							},
						],
					},
				],
			},
			{
				Component: ProtectedRoute,
				loader: protectedLoader,
				path: ROUTES.PRIVATE.META,
				lazy: () => import('@/pages/private/meta.page'),
			},
			{
				path: ROUTES.PUBLIC.NOT_FOUND,
				lazy: () => import('@/pages/public/not-found.page'),
			},
		],
	},
]);
