import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '@/entities/user';
import { cn } from '@/shared/lib/utils';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/ui/card';
import { DatePicker } from '@/shared/ui/date-picker';
import { Field, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { PURPOSE_OPTIONS } from './model/constants';

export const MetaPage = () => {
	const [nickname, setNickname] = useState('');
	const [purpose, setPurpose] = useState('');
	const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
	const navigate = useNavigate();

	const { handleUpdateUser, isUpdating } = useUser();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const payload = {
			nickname,
			purpose,
			birthdate: birthDate ? birthDate.toISOString() : undefined,
			profileCompleted: true,
		};
		handleUpdateUser(payload).then(() => {
			navigate(ROUTES.PUBLIC.HOME);
		});
	};

	const today = new Date();

	// минимум 100 лет назад
	const minDate = new Date(
		today.getFullYear() - 100,
		today.getMonth(),
		today.getDate(),
	);

	// минимум 13 лет
	const maxDate = new Date(
		today.getFullYear() - 13,
		today.getMonth(),
		today.getDate(),
	);

	return (
		<div className='flex min-h-screen items-center justify-center p-4'>
			<Card className='w-full max-w-md'>
				<CardHeader>
					<CardTitle className='text-2xl'>Welcome</CardTitle>
					<CardDescription>Tell us a little about yourself</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
						<Field>
							<FieldLabel>Nickname</FieldLabel>
							<Input
								placeholder='Insert your nickname'
								value={nickname}
								onChange={e => setNickname(e.target.value)}
								required
							/>
						</Field>

						<Field>
							<FieldLabel>Birthdate</FieldLabel>
							<DatePicker
								endDate={maxDate}
								value={birthDate}
								fromDate={minDate}
								onChange={setBirthDate}
							/>
						</Field>

						<Field>
							<FieldLabel>Purpose of use</FieldLabel>
							<div className='grid grid-cols-2 gap-3'>
								{PURPOSE_OPTIONS.map(({ value, label, icon: Icon }) => (
									<button
										key={value}
										type='button'
										onClick={() => setPurpose(value)}
										className={cn(
											'flex flex-col items-center gap-2 rounded-lg border-2 p-4 font-medium text-sm transition-colors',
											'hover:bg-accent hover:text-accent-foreground',
											purpose === value
												? 'border-primary bg-primary/5 text-primary'
												: 'border-border text-muted-foreground',
										)}>
										<Icon size={24} strokeWidth={1.5} />
										{label}
									</button>
								))}
							</div>
						</Field>

						<Button type='submit' className='mt-2' disabled={isUpdating}>
							Продолжить
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export const Component = MetaPage;
