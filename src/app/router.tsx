import { createBrowserRouter } from 'react-router';
import { ROUTES } from '@/shared/model/routes';
import { App } from './app';
import { MainLayout } from './layouts/main-layout';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: ROUTES.PUBLIC.LOGIN,
				lazy: () => import('@/pages/public/log-in.page'),
			},
			{
				path: ROUTES.PUBLIC.SIGNIN,
				lazy: () => import('@/pages/public/log-in.page'),
			},
			{
				path: ROUTES.PUBLIC.LOGIN,
				lazy: () => import('@/pages/public/sign-in.page'),
			},
			{
				element: <MainLayout />,
				children: [
					{
						path: ROUTES.PUBLIC.HOME,
						lazy: () => import('@/pages/private/home.page'),
					},
					{
						path: ROUTES.PRIVATE.VIDEO,
						lazy: () => import('@/pages/private/video.page'),
					},
				],
			},
		],
	},
]);
