import type { PropsWithChildren } from 'react';
import { Outlet } from 'react-router';
import { Aurora } from '@/shared/ui/aurora';
import { Header } from '@/widgets/header';
import { ModelProvider } from '../providers/model-provider';

export const MainLayout = ({ children }: PropsWithChildren) => {
	return (
		<ModelProvider>
			<Header />
			<main className='mt-22.5 flex h-full flex-1 flex-col px-5'>
				<Outlet />
				<Aurora speed={1} amplitude={1.0} />
				{children}
			</main>
		</ModelProvider>
	);
};
