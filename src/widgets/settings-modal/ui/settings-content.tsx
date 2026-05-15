import { DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { ProfileTab } from './tabs/profile-tab';

export const SettingsContent = () => {
	return (
		<>
			<DialogHeader>
				<DialogTitle>Settings</DialogTitle>
			</DialogHeader>

			<Tabs defaultValue='profile'>
				<TabsList className='my-2 w-full justify-start bg-transparent'>
					<TabsTrigger value='profile'>Main settings</TabsTrigger>
				</TabsList>

				<TabsContent value='profile'>
					<ProfileTab />
				</TabsContent>
			</Tabs>
		</>
	);
};
