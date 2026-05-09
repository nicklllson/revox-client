import { Controller, useFormContext } from 'react-hook-form';
import { useTranslationParams } from '@/shared/config/translation-params/lib/use-translation-params';

export const TranslationParams = () => {
	const { paramDefs } = useTranslationParams();
	const { control, formState } = useFormContext();

	if (paramDefs.length === 0) return null;

	return (
		<>
			{paramDefs.map(({ slot, def }) => (
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
			))}
		</>
	);
};
