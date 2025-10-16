import 'react-i18next';
import type translationEN from './locales/en/translation.json';

declare module 'react-i18next' {
	interface CustomTypeOptions {
		resources: {
			translation: typeof translationEN;
		};
	}
}
