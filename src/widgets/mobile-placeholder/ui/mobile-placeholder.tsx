import { Smartphone } from 'lucide-react';
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/shared/ui/empty';

export const MobilePlaceholder = () => {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant='icon'>
					<Smartphone />
				</EmptyMedia>
				<EmptyTitle>No Smartphone and Tablets Yet</EmptyTitle>
				<EmptyDescription>
					Revox doesn&apos;t support smartphones and tablets yet. Switch to a
					desktop or laptop to get started.
				</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
};
