import { cn } from './lib/cn';

type ResponsiveProps = React.ComponentProps<'div'>;

export function Responsive({ children, className }: ResponsiveProps): React.JSX.Element {
	return <div className={cn('mx-auto w-responsive', className)}>{children}</div>;
}
