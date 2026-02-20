import { Link } from 'react-router';
import { ROUTES } from '../model/routes';
import { ShinyText } from './shiny-text';

export const Logo = () => {
	return (
		<Link to={ROUTES.PUBLIC.HOME} className='font-bold text-xl'>
			<ShinyText spread={100} text='REEEVOX' />
		</Link>
	);
};
