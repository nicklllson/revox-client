import { Outlet } from 'react-router';
import { AuthProvider } from './providers/auth-provider';
import { ThemeProvider } from './providers/theme-provider';

export const App = () => {
	return (
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<AuthProvider>
				<Outlet />
			</AuthProvider>
		</ThemeProvider>
	);
};
