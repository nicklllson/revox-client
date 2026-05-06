import { useMemo, useState } from 'react';
import { useUser } from '@/entities/user';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

export const ProfileTab = () => {
	const { user, handleUpdateUser, isUpdating } = useUser();

	const serverNickname = useMemo(() => user?.nickname ?? '', [user]);
	const [nickname, setNickname] = useState(serverNickname);

	const isDirty = nickname !== serverNickname;

	const handleSave = async () => {
		if (!isDirty) return;
		await handleUpdateUser({ nickname });
	};

	return (
		<div className='flex min-h-90 flex-col space-y-5'>
			<div className='space-y-1.5'>
				<Label>Nickname</Label>
				<Input value={nickname} onChange={e => setNickname(e.target.value)} />
			</div>

			<div className='flex-1 space-y-1.5'>
				<Label>Email</Label>
				<Input value={user?.email} disabled />
			</div>

			<div className='flex justify-end'>
				<Button onClick={handleSave} disabled={!isDirty || isUpdating}>
					{isUpdating ? 'Saving...' : 'Save'}
				</Button>
			</div>
		</div>
	);
};
