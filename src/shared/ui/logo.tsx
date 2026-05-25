import clsx from 'clsx';
import { Link } from 'react-router';
import { ROUTES } from '../model/routes';
import { ShinyText } from './shiny-text';

export const Logo = ({ className }: { className?: string }) => {
	return (
		<Link
			to={ROUTES.PUBLIC.HOME}
			className={clsx(className, 'font-bold text-xl')}>
			<ShinyText spread={100} text='Revox' />
		</Link>
	);
};
