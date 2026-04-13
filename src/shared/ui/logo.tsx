import clsx from 'clsx';
import { Link } from 'react-router';
import { ROUTES } from '../model/routes';
import { ShinyText } from './shiny-text';

export const Logo = ({ className }: { className?: string }) => {
	return (
		<Link
			to={ROUTES.PUBLIC.HOME}
			className={clsx('font-bold text-xl', className)}>
			<ShinyText spread={100} text='ReVOX' />
		</Link>
	);
};
