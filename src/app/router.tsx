import { createBrowserRouter, Outlet } from 'react-router';
import { ROUTES } from '@/shared/model/routes';
import { History } from '@/widgets/history';
import { App } from './app';
import { AuthLayout } from './layouts/auth-layout';
import { MainLayout } from './layouts/main-layout';

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
				element: <MainLayout />,
				children: [
					{
						path: ROUTES.PUBLIC.PRICING,
						lazy: () => import('@/pages/public/pricing.page'),
					},
					{
						element: (
							<>
								<History />
								<Outlet />
							</>
						),
						children: [
							{
								path: ROUTES.PUBLIC.HOME,
								lazy: () => import('@/pages/public/home.page'),
							},
							{
								path: ROUTES.PRIVATE.VIDEO,
								lazy: () => import('@/pages/private/video.page'),
							},
						],
					},
				],
			},
		],
	},
]);
