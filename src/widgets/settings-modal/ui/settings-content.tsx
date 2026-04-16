import { DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { NotificationsTab } from './tabs/notifications-tab';
import { PlanTab } from './tabs/plan-tab';
import { ProfileTab } from './tabs/profile-tab';
import { TranslationTab } from './tabs/translation-tab';

export const SettingsContent = () => {
	return (
		<>
			<DialogHeader>
				<DialogTitle>Настройки</DialogTitle>
			</DialogHeader>

			<Tabs defaultValue='profile'>
				<TabsList className='w-full justify-start rounded-none border-b px-5'>
					<TabsTrigger value='profile'>Профиль</TabsTrigger>
					<TabsTrigger value='plan'>Тариф</TabsTrigger>
					<TabsTrigger value='translation'>Перевод</TabsTrigger>
					<TabsTrigger value='notifications'>Уведомления</TabsTrigger>
				</TabsList>

				<TabsContent value='profile'>
					<ProfileTab />
				</TabsContent>
				<TabsContent value='plan'>
					<PlanTab />
				</TabsContent>
				<TabsContent value='translation'>
					<TranslationTab />
				</TabsContent>
				<TabsContent value='notifications'>
					<NotificationsTab />
				</TabsContent>
			</Tabs>
		</>
	);
};
