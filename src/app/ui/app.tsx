import { Outlet } from 'react-router';
import { Toaster } from 'sonner';
import { AuthProvider } from '../providers/auth-provider';
import { useTheme } from '../providers/theme-provider';

export const App = () => {
	const { theme } = useTheme();
	return (
		<AuthProvider>
			<Outlet />
			<Toaster position='bottom-right' theme={theme} richColors />
		</AuthProvider>
	);
};
