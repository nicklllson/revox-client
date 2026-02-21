import { Plus } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import { HistoryItem } from './history-item';

export const History = () => {
	return (
		<div className='-translate-y-1/2 absolute top-1/2 left-5 rounded-xl bg-primary-foreground p-2.5'>
			<Button
				variant='outline'
				className='flex h-13 w-13 items-center justify-center'>
				<Plus size={16} />
			</Button>
			<Separator />
			<HistoryItem />
		</div>
	);
};
