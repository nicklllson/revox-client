import { DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { AppTab } from './tabs/app-tab';
import { NotificationsTab } from './tabs/notifications-tab';
import { ProfileTab } from './tabs/profile-tab';

export const SettingsContent = () => {
	return (
		<>
			<DialogHeader>
				<DialogTitle>Settings</DialogTitle>
			</DialogHeader>

			<Tabs defaultValue='profile'>
				<TabsList className='my-2 w-full justify-start bg-transparent'>
					<TabsTrigger value='profile'>Profile</TabsTrigger>
					<TabsTrigger value='app'>App</TabsTrigger>
					<TabsTrigger value='notifications'>Notifications</TabsTrigger>
				</TabsList>

				<TabsContent value='profile'>
					<ProfileTab />
				</TabsContent>
				<TabsContent value='app'>
					<AppTab />
				</TabsContent>
				<TabsContent value='notifications'>
					<NotificationsTab />
				</TabsContent>
			</Tabs>
		</>
	);
};
