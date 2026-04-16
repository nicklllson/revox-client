import { useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

export const ProfileTab = () => {
	const [nickname, setNickname] = useState('');
	const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
	const fileRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setAvatarUrl(URL.createObjectURL(file));
	};

	return (
		<div className='space-y-5 p-5'>
			<div className='flex items-center gap-4'>
				<Avatar className='h-14 w-14'>
					<AvatarImage src={avatarUrl ?? undefined} />
					<AvatarFallback>NI</AvatarFallback>
				</Avatar>
				<div className='flex flex-col gap-1'>
					<button
						type='button'
						className='text-left text-blue-500 text-sm'
						onClick={() => fileRef.current?.click()}>
						Загрузить фото
					</button>
					{avatarUrl && (
						<button
							type='button'
							className='text-left text-red-500 text-sm'
							onClick={() => setAvatarUrl(null)}>
							Удалить
						</button>
					)}
					<input
						ref={fileRef}
						type='file'
						accept='image/*'
						className='hidden'
						onChange={handleFileChange}
					/>
				</div>
			</div>

			<div className='space-y-1.5'>
				<Label>Никнейм</Label>
				<Input value={nickname} onChange={e => setNickname(e.target.value)} />
			</div>

			<div className='space-y-1.5'>
				<Label>Email</Label>
				<Input value='nick@example.com' disabled />
			</div>

			<div className='flex justify-end'>
				<Button>Сохранить</Button>
			</div>
		</div>
	);
};
