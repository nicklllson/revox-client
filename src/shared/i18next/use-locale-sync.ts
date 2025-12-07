import { useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { SUPPORTED_LANGS, type TSupportedLang } from '@/features/language';
import i18n from './config';

export const useLocaleSync = () => {
	const { lang } = useParams();
	const navigate = useNavigate();

	useLayoutEffect(() => {
		if (!lang) return;

		if (!SUPPORTED_LANGS.includes(lang as TSupportedLang)) {
			navigate(`/${i18n.options.fallbackLng}`, { replace: true });
			return;
		}

		if (i18n.language !== lang) {
			i18n.changeLanguage(lang);
		}
	}, [lang, navigate]);
};
