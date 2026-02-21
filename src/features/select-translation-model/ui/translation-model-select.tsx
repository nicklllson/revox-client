import { Button } from '@/shared/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

export const TranslationModelSelect = () => {
	return (
		<div className='-translate-x-1/2 fixed bottom-5 left-1/2'>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='outline' size='lg'>
						Whisper 1.0
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-40' align='center'>
					<DropdownMenuGroup>
						<DropdownMenuItem>Profile</DropdownMenuItem>
						<DropdownMenuItem>Billing</DropdownMenuItem>
						<DropdownMenuItem>Settings</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
