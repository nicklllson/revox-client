/** biome-ignore-all lint/correctness/useExhaustiveDependencies: Explicit */

import { X } from 'lucide-react';
import { useMemo } from 'react';
import { usePlayer } from '@/app/providers/player-provider/player-provider';
import { useSubtitles } from '@/app/providers/subtitles-provider';
import type { TSegment } from '@/entities/translation';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { useDynamicSubtitles } from '../lib/use-dynamic-subtitles';

const formatTime = (seconds: number) => {
	const m = Math.floor(seconds / 60);
	const s = Math.floor(seconds % 60);
	return `${m}:${s.toString().padStart(2, '0')}`;
};

export const Subtitles = () => {
	const { isOpen, toggle } = useSubtitles();
	const { chunkMetas, playerTimeRef } = usePlayer();

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

	if (!isOpen) return null;

	return (
		<div className='relative z-10 ml-2 flex w-full max-w-[14vw] flex-col overflow-hidden rounded-2xl border border-input bg-background'>
			<div className='flex shrink-0 items-center justify-between border-border border-b px-4 py-3'>
				<span className='font-medium text-muted-foreground text-sm'>
					Subtitles
				</span>
				<Button size='icon' variant='ghost' onClick={toggle}>
					<X className='text-muted-foreground' />
				</Button>
			</div>

			{allSegments.length === 0 ? (
				<div className='flex min-h-[400px] flex-1 items-center justify-center p-4'>
					<p className='text-center text-muted-foreground text-sm'>
						Subtitles will appear here
					</p>
				</div>
			) : (
				<div className='max-h-[60vh] overflow-y-auto p-3'>
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
			)}
		</div>
	);
};
