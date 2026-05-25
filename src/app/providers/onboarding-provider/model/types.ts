type TStepItem = {
	icon: React.ReactNode | string | null;
	title: string;
	content: React.ReactNode;
	selector: string;
	side:
		| 'top'
		| 'bottom'
		| 'left'
		| 'right'
		| 'top-left'
		| 'top-right'
		| 'bottom-left'
		| 'bottom-right';
	showControls: boolean;
	showSkip: boolean;
	blockKeyboardControl?: boolean;
	pointerPadding?: number;
	pointerRadius?: number;
	nextRoute?: string;
	prevRoute?: string;
	viewportID?: string;
	disableInteraction?: boolean;
};

export type TStep = {
	tour: string;
	steps: TStepItem[];
};
