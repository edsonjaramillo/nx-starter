import { buttonVariants } from '@repo/ui/button';
import { Link } from '@tanstack/react-router';

const links = [
	{
		name: 'Home',
		to: '/',
	},
	{
		name: 'Users',
		to: '/users',
	},
	{
		name: 'Sign In',
		to: '/sign-in',
	},
] as const;

export function Navigation() {
	const buttonStyle = buttonVariants();
	return (
		<div className="flex gap-4">
			{links.map(({ name, to }) => (
				<Link key={name} to={to} className={buttonStyle}>
					{name}
				</Link>
			))}
		</div>
	);
}
