import {
	ArrowDownToLine,
	ArrowUpToLine,
	CalendarOff,
	CircleX,
	type LucideIcon,
	PlayCircle,
	RotateCcw,
	Sparkles,
} from 'lucide-react';
import type { TSubscriptionEventType } from '@/entities/subscription';

type TEventConfig = {
	label: string;
	icon: LucideIcon;
	color: string;
};

export const EVENT_CONFIG: Record<TSubscriptionEventType, TEventConfig> = {
	CREATED: {
		label: 'Account created',
		icon: Sparkles,
		color: 'text-white',
	},
	UPGRADED: {
		label: 'Plan upgraded',
		icon: ArrowUpToLine,
		color: 'text-green-400',
	},
	DOWNGRADED: {
		label: 'Plan downgraded',
		icon: ArrowDownToLine,
		color: 'text-amber-400',
	},
	RENEWED: {
		label: 'Plan renewed',
		icon: RotateCcw,
		color: 'text-blue-400',
	},
	CANCELED: {
		label: 'Subscription canceled',
		icon: CircleX,
		color: 'text-amber-400',
	},
	REACTIVATED: {
		label: 'Subscription reactivated',
		icon: PlayCircle,
		color: 'text-green-400',
	},
	EXPIRED: {
		label: 'Subscription expired',
		icon: CalendarOff,
		color: 'text-white/50',
	},
};
