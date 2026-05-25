import { useCancelSubscription } from '@/entities/subscription';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/shared/ui/alert-dialog';

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	endPeriod: string | null;
	tierName: string;
};

export const CancelConfirmDialog = ({
	open,
	onOpenChange,
	endPeriod,
	tierName,
}: Props) => {
	const { cancelSubscription, isCanceling } = useCancelSubscription();

	const handleConfirm = async () => {
		await cancelSubscription();
		onOpenChange(false);
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Cancel {tierName} subscription?</AlertDialogTitle>
					<AlertDialogDescription>
						You'll keep access to {tierName} features until {endPeriod}. After
						that, your account will be downgraded to Free.
						<br />
						<br />
						You can reactivate any time before {endPeriod}.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isCanceling}>
						Keep subscription
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleConfirm}
						disabled={isCanceling}
						variant='destructive'>
						{isCanceling ? 'Canceling...' : 'Cancel subscription'}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
