import { useNavigate, useParams } from 'react-router';
import {
	DEFAULT_LANG,
	SUPPORTED_LANGS,
	type TSupportedLang,
} from './constants';

const REGEX = /^\/[a-z]{2}/;

export const useLanguage = () => {
	const { lang } = useParams<{ lang: TSupportedLang }>();
	const navigate = useNavigate();

	const currentLang =
		lang && SUPPORTED_LANGS.includes(lang as TSupportedLang)
			? (lang as TSupportedLang)
			: DEFAULT_LANG;

	const changeLanguage = (newLang: TSupportedLang) => {
		const currentPath = window.location.pathname;
		const pathWithoutLang = currentPath.replace(REGEX, '');
		navigate(`/${newLang}${pathWithoutLang}`);
	};

	return {
		currentLang,
		changeLanguage,
		supportedLangs: SUPPORTED_LANGS,
	};
};
