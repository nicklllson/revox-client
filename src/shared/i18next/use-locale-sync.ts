import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import i18n from './config';

export const useLocaleSync = () => {
	const { locale } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (!locale) return;

		const supported = ['en', 'ru'];
		if (!supported.includes(locale)) {
			navigate(`/${i18n.options.fallbackLng}`, { replace: true });
			return;
		}

		if (i18n.language !== locale) {
			i18n.changeLanguage(locale);
		}
	}, [locale, navigate]);
};
