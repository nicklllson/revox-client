/** biome-ignore-all lint/correctness/useExhaustiveDependencies: Explicit */

import { Download, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { usePlayer } from '@/app/providers/player-provider/player-provider';
import { useSubtitles } from '@/app/providers/subtitles-provider';
import type { TSegment } from '@/entities/translation';
import { privateApi } from '@/shared/lib/api';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { useSidebar } from '@/shared/ui/sidebar';
import { useDynamicSubtitles } from '../lib/use-dynamic-subtitles';
import { LANG_OPTIONS } from '../model/constants';
import { formatTime } from '../model/services';
import type { TSubLang } from '../model/types';

const REGEX = /filename="?([^"]+)"?/;

export const Subtitles = ({ sessionId }: { sessionId: string | null }) => {
	const { isOpen, toggle } = useSubtitles();
	const { chunkMetas, playerTimeRef } = usePlayer();
	const { open } = useSidebar();

	const [downloading, setDownloading] = useState(false);

	const allSegments = useMemo(() => {
		const segs: TSegment[] = [];
		for (const meta of chunkMetas.values()) {
			segs.push(...meta.segments);
		}
		return segs.sort((a, b) => a.start - b.start);
	}, [chunkMetas]);

	const { activeRef, currentTime, activeIndex } = useDynamicSubtitles(
		allSegments,
		playerTimeRef,
	);

	const handleExport = async (lang: TSubLang) => {
		if (!sessionId || downloading) return;
		setDownloading(true);
		try {
			const res = await privateApi<void, any>(
				`/subtitles/${sessionId}?lang=${lang}`,
			);
			const blob = await res.blob();

			const disposition = res.headers.get('Content-Disposition') ?? '';
			const match = disposition.match(REGEX);
			const filename = match?.[1] ?? `subtitles_${lang}.srt`;

			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = filename;
			document.body.appendChild(a);
			a.click();
			a.remove();
			URL.revokeObjectURL(url);
		} catch (err) {
			console.error(err);
		} finally {
			setDownloading(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div
			className={cn(
				'relative z-10 ml-2 flex w-full max-w-[14vw] flex-col overflow-hidden rounded-2xl border border-input bg-background max-2xl:max-w-[22vw]',
				{
					'max-w-[25vw]': !open,
				},
			)}>
			<div className='flex shrink-0 items-center justify-between border-border border-b px-4 py-3'>
				<span className='font-medium text-muted-foreground text-sm'>
					Subtitles
				</span>
				<div className='flex items-center gap-1'>
					<Button size='icon' variant='ghost' onClick={toggle}>
						<X className='text-muted-foreground' />
					</Button>
				</div>
			</div>

			{allSegments.length === 0 ? (
				<div className='flex min-h-[400px] flex-1 items-center justify-center p-4'>
					<p className='text-center text-muted-foreground text-sm'>
						Subtitles will appear here
					</p>
				</div>
			) : (
				<>
					<div className='max-h-[60vh] flex-1 overflow-y-auto p-3'>
						{allSegments.map((seg, i) => {
							const isActive = i === activeIndex;
							const isPast = !isActive && seg.end <= currentTime;
							return (
								<div
									key={seg.id}
									ref={isActive ? activeRef : undefined}
									className={cn(
										'rounded-lg px-3 py-2 text-sm transition-colors duration-300',
										isActive && 'bg-white/5 font-medium text-white',
										isPast && 'text-white/30',
										!isActive && !isPast && 'text-white/50',
									)}>
									<span
										className={cn(
											'mb-0.5 block font-mono text-xs',
											isActive ? 'text-white/60' : 'opacity-40',
										)}>
										{formatTime(seg.start)}
									</span>
									{seg.translated_text}
								</div>
							);
						})}
					</div>

					{/* футер с экспортом */}
					<div className='shrink-0 border-border border-t p-3'>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant='outline'
									className='w-full'
									disabled={!sessionId || downloading}>
									<Download className='\ size-4' />
									{downloading ? 'Downloading...' : 'Download Subtitles SRT'}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end' side='top' className='w-44'>
								{LANG_OPTIONS.map(opt => (
									<DropdownMenuItem
										key={opt.value}
										onSelect={() => handleExport(opt.value)}>
										{opt.label}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</>
			)}
		</div>
	);
};
