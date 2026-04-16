import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog';

export const UpgradeModal = ({ trigger }: { trigger?: React.ReactNode }) => {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	const handleUpgrade = () => {
		setOpen(false);
		navigate(ROUTES.PUBLIC.PRICING);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{trigger ?? <Button variant='outline'>Upgrade Plan</Button>}
			</DialogTrigger>
			<DialogContent className='h-[50dvh] min-h-[320px] w-full max-w-200! overflow-hidden p-0'>
				<div className='flex'>
					<div className='flex flex-1 flex-col p-6'>
						<DialogHeader>
							<DialogTitle>Upgrade to Pro</DialogTitle>
							<DialogDescription>
								Unlock unlimited generations, priority rendering, and exclusive
								features.
							</DialogDescription>
						</DialogHeader>
						<div className='flex-1 space-y-3 py-4'>
							<div className='flex items-center gap-2 text-sm'>
								<span>✦</span>
								<span>Unlimited image & video generations</span>
							</div>
							<div className='flex items-center gap-2 text-sm'>
								<span>✦</span>
								<span>Priority queue & faster rendering</span>
							</div>
							<div className='flex items-center gap-2 text-sm'>
								<span>✦</span>
								<span>Access to latest models & features</span>
							</div>
							<div className='flex items-center gap-2 text-sm'>
								<span>✦</span>
								<span>Commercial usage rights</span>
							</div>
						</div>
						<DialogFooter className='pt-2'>
							<DialogClose asChild>
								<Button variant='outline'>Maybe later</Button>
							</DialogClose>
							<Button type='submit' onClick={handleUpgrade}>
								Upgrade now
							</Button>
						</DialogFooter>
					</div>
					<div className='relative w-100 shrink-0 overflow-hidden bg-muted'>
						<img src='' alt='Pro plan' className='h-full w-full object-cover' />
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
