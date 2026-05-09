import { cn } from '@/shared/lib/utils';

interface ModelDotProps {
	accent: string;
	size?: number;
	large?: boolean;
}

export const ModelDot = ({
	accent,
	size = 24,
	large = false,
}: ModelDotProps) => {
	return (
		<span
			className={cn(
				'flex shrink-0 items-center justify-center rounded-full text-white',
				'shadow-[0_0_0_1px_rgba(255,255,255,0.08)]',
			)}
			style={{
				width: size,
				height: size,
				background: `radial-gradient(circle at 30% 30%, ${accent}, oklch(0.25 0.08 260))`,
				boxShadow: `0 0 0 1px rgba(255,255,255,0.08), 0 0 ${large ? 16 : 8}px ${accent.replace(')', ' / 0.4)')}`,
			}}>
			<svg
				width={Math.round(size * 0.55)}
				height={Math.round(size * 0.55)}
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='1.75'
				strokeLinecap='round'
				strokeLinejoin='round'>
				<path d='M3 12h2M7 8v8M11 5v14M15 8v8M19 11v2M21 12h2' />
			</svg>
		</span>
	);
};
