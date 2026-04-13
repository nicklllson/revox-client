import { forwardRef, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/ui/input';
import { IconPasswordEye } from '../icons/password-eye';

export const PasswordInput = forwardRef<
	HTMLInputElement,
	Omit<React.ComponentProps<'input'>, 'type'>
>(({ className, disabled, ...props }, ref) => {
	const [visible, setVisible] = useState(false);

	const toggleVisible = () => {
		if (!disabled) {
			setVisible(prev => !prev);
		}
	};

	return (
		<div className='relative'>
			<Input
				ref={ref}
				type={visible ? 'text' : 'password'}
				className={cn('pr-10', className)}
				disabled={disabled}
				{...props}
			/>
			<button
				type='button'
				disabled={disabled}
				className='absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50'
				onClick={toggleVisible}
				tabIndex={-1}>
				<IconPasswordEye isVisible={visible} />
			</button>
		</div>
	);
});

PasswordInput.displayName = 'PasswordInput';
