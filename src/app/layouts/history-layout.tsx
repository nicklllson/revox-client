import { Outlet } from 'react-router';
import { SidebarInset, SidebarProvider } from '@/shared/ui/sidebar';
import { AppSidebar } from '@/widgets/app-sidebar';
import { Header } from '@/widgets/header';
import { SettingsModal } from '@/widgets/settings-modal';

export const HistoryLayout = () => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<Header />
				<Outlet />
			</SidebarInset>
			<SettingsModal />
		</SidebarProvider>
	);
};
