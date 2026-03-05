import type { PropsWithChildren } from 'react';
import { Outlet } from 'react-router';
import { Header } from '@/widgets/header';
import { ModelProvider } from '../providers/model-provider';

export const MainLayout = ({ children }: PropsWithChildren) => {
	return (
		<ModelProvider>
			<Header />
			<main className='mt-18 flex h-full flex-1 flex-col px-5'>
				<Outlet />
				{children}
			</main>
		</ModelProvider>
	);
};
