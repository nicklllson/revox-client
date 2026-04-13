import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/ui/card';
import { Field, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { PURPOSE_OPTIONS } from './model/constants';

export const MetaPage = () => {
	const [nickname, setNickname] = useState('');
	const [purpose, setPurpose] = useState('');
	const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
	const [showCalendar, setShowCalendar] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// console.log({
		// 	nickname,
		// 	purpose,
		// 	birthDate: birthDate ? birthDate.toISOString() : undefined,
		// });
	};

	const handleDateSelect = (date: Date | undefined) => {
		setBirthDate(date);
		setShowCalendar(false);
	};

	return (
		<div className='flex min-h-screen items-center justify-center p-4'>
			<Card className='w-full max-w-md'>
				<CardHeader>
					<CardTitle>Добро пожаловать</CardTitle>
					<CardDescription>Расскажите немного о себе</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
						<Field>
							<FieldLabel>Nickname</FieldLabel>
							<Input
								placeholder='Введите ваш nickname'
								value={nickname}
								onChange={e => setNickname(e.target.value)}
								required
							/>
						</Field>

						<Field>
							<FieldLabel>Цель использования</FieldLabel>
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

						<Field>
							<FieldLabel>Дата рождения</FieldLabel>
							<div className='relative'>
								<Button
									type='button'
									variant='outline'
									className={cn(
										'w-full justify-start text-left font-normal',
										!birthDate && 'text-muted-foreground',
									)}
									onClick={() => setShowCalendar(!showCalendar)}>
									<CalendarIcon className='mr-2 size-4' />
									{birthDate ? (
										format(birthDate, 'dd MMMM yyyy', { locale: ru })
									) : (
										<span>Выберите дату</span>
									)}
								</Button>
								{showCalendar && (
									<div className='absolute bottom-full left-0 z-50 mb-2 rounded-lg border bg-popover p-3 shadow-md'>
										<Calendar
											mode='single'
											selected={birthDate}
											captionLayout='dropdown'
											onSelect={handleDateSelect}
										/>
									</div>
								)}
							</div>
						</Field>

						<Button type='submit' className='mt-2'>
							Продолжить
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export const Component = MetaPage;
