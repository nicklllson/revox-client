import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/ui/card';

export const StatusCard = ({
	icon,
	title,
	description,
	details,
	action,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
	details?: string;
	action?: React.ReactNode;
}) => (
	<Card>
		<CardHeader className='items-center text-center'>
			<div className='mx-auto mb-4'>{icon}</div>
			<CardTitle className='text-2xl'>{title}</CardTitle>
			<CardDescription className='text-base'>{description}</CardDescription>
		</CardHeader>
		<CardContent className='flex flex-col items-center gap-6'>
			{details && <p className='text-muted-foreground text-sm'>{details}</p>}
			{action}
		</CardContent>
	</Card>
);
