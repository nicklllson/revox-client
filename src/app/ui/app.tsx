import { Outlet } from 'react-router';
import { Toaster } from 'sonner';
import { useMedia } from '@/shared/hooks';
import { MobilePlaceholder } from '@/widgets/mobile-placeholder';
import { AuthProvider } from '../providers/auth-provider';
import { OnboardingProviders } from '../providers/onboarding-provider';
import { useTheme } from '../providers/theme-provider';

export const App = () => {
	const { theme } = useTheme();
	const isMobile = useMedia(1025);

	if (isMobile) {
		return <MobilePlaceholder />;
	}

	return (
		<AuthProvider>
			<OnboardingProviders>
				<Outlet />
				<Toaster position='bottom-right' theme={theme} richColors />
			</OnboardingProviders>
		</AuthProvider>
	);
};
