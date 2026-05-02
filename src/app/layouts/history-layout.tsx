import { Outlet } from 'react-router';
import { SidebarInset, SidebarProvider } from '@/shared/ui/sidebar';
import { AppSidebar } from '@/widgets/app-sidebar';
import { Header } from '@/widgets/header';
import { SettingsModal } from '@/widgets/settings-modal';

export const HistoryLayout = () => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className='px-5 pt-22.5'>
				<Header />
				<Outlet />
			</SidebarInset>
			<SettingsModal />
		</SidebarProvider>
	);
};
