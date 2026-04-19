import { DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { NotificationsTab } from './tabs/notifications-tab';
import { PlanTab } from './tabs/plan-tab';
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
					<TabsTrigger value='plan'>Tariff</TabsTrigger>
					<TabsTrigger value='notifications'>Notifications</TabsTrigger>
				</TabsList>

				<TabsContent value='profile'>
					<ProfileTab />
				</TabsContent>
				<TabsContent value='plan'>
					<PlanTab />
				</TabsContent>
				<TabsContent value='notifications'>
					<NotificationsTab />
				</TabsContent>
			</Tabs>
		</>
	);
};
