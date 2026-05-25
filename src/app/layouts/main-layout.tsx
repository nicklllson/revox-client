import type { PropsWithChildren } from 'react';
import { Outlet } from 'react-router';
import { useSession } from '@/entities/auth';
import { useOnboarding } from '@/features/onboarding';
import { useUserEvent } from '@/features/user-event';
import { Aurora } from '@/shared/ui/aurora';
import { ModelProvider } from '../providers/model-provider';

export const MainLayout = ({ children }: PropsWithChildren) => {
	const { session } = useSession();

	useUserEvent('auth', { enabled: !!session });
	useOnboarding();

	return (
		<ModelProvider>
			<div className='flex h-full flex-1 flex-col'>
				<Outlet />
				<Aurora speed={1} amplitude={1.0} />
				{children}
			</div>
		</ModelProvider>
	);
};
