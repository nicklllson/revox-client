import { Controller, useFormContext } from 'react-hook-form';
import { LockedParam } from '@/shared/config/translation-params';
import { useTranslationParams } from '@/shared/config/translation-params/lib/use-translation-params';

export const TranslationParams = () => {
	const { paramDefs } = useTranslationParams();
	const { control, formState } = useFormContext();

	if (paramDefs.length === 0) return null;

	return (
		<>
			{paramDefs.map(({ slot, def, isLocked }) => {
				if (isLocked) {
					return (
						<LockedParam
							key={slot.id}
							label={def.label}
							requiredTier={slot.minTier as 'PRO' | 'PREMIUM'}
						/>
					);
				}

				return (
					<Controller
						key={slot.id}
						name={`params.${slot.id}`}
						control={control}
						render={({ field }) => {
							const Control = def.Control;
							return (
								<Control
									onChange={field.onChange}
									isInvalid={!!formState.errors}
									value={field.value ?? def.defaultValue}
								/>
							);
						}}
					/>
				);
			})}
		</>
	);
};
