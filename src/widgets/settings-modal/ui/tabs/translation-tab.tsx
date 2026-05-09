import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/select';

const LANGUAGES = [
	'Русский',
	'Английский',
	'Немецкий',
	'Французский',
	'Испанский',
];
const PROVIDERS = [
	{ id: 'labs', label: 'Labs' },
	{ id: 'elevenlabs', label: 'ElevenLabs' },
];
const VOICES: Record<string, string[]> = {
	labs: ['Алексей — нейтральный', 'Мария — мягкий', 'Дмитрий — деловой'],
	elevenlabs: ['Rachel', 'Adam', 'Bella'],
};

export const TranslationTab = () => {
	const [provider, setProvider] = useState<'labs' | 'elevenlabs'>('labs');

	return (
		<div className='space-y-5 p-5'>
			<div className='grid grid-cols-2 gap-4'>
				<div className='space-y-1.5'>
					<Label>Язык перевода</Label>
					<Select defaultValue='Русский'>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{LANGUAGES.map(l => (
								<SelectItem key={l} value={l}>
									{l}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className='space-y-1.5'>
					<Label>Провайдер голоса</Label>
					<Select
						value={provider}
						onValueChange={v => setProvider(v as typeof provider)}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{PROVIDERS.map(p => (
								<SelectItem key={p.id} value={p.id}>
									{p.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className='space-y-1.5'>
				<Label>Голос по умолчанию</Label>
				<Select defaultValue={VOICES[provider][0]}>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{VOICES[provider].map(v => (
							<SelectItem key={v} value={v}>
								{v}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className='flex justify-end'>
				<Button>Сохранить</Button>
			</div>
		</div>
	);
};
