import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Switch } from '@/shared/ui/switch';

const NOTIFICATIONS = [
	{
		id: 'done',
		label: 'Перевод завершён',
		desc: 'Email когда видео готово',
		default: true,
	},
	{
		id: 'error',
		label: 'Ошибка обработки',
		desc: 'Уведомлять если задача упала',
		default: true,
	},
	{
		id: 'news',
		label: 'Новости и обновления',
		desc: 'Новые функции платформы',
		default: false,
	},
];

export const NotificationsTab = () => {
	const [state, setState] = useState(
		Object.fromEntries(NOTIFICATIONS.map(n => [n.id, n.default])),
	);

	return (
		<div className='p-5'>
			<div className='space-y-1'>
				{NOTIFICATIONS.map(n => (
					<div
						key={n.id}
						className='flex items-center justify-between border-b py-3 last:border-0'>
						<div>
							<p className='text-sm'>{n.label}</p>
							<p className='mt-0.5 text-muted-foreground text-xs'>{n.desc}</p>
						</div>
						<Switch
							checked={state[n.id]}
							onCheckedChange={v => setState(s => ({ ...s, [n.id]: v }))}
						/>
					</div>
				))}
			</div>
			<div className='mt-5 flex justify-end'>
				<Button>Сохранить</Button>
			</div>
		</div>
	);
};
