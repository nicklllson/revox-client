import { LoggedInActions } from './logged-in-actions';

export const HeaderActions = () => {
	const isLoggedIn = true;
	if (isLoggedIn) {
		return <LoggedInActions />;
	}
	return <div>{isLoggedIn && <LoggedInActions />}</div>;
};
