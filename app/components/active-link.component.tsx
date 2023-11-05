import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ActiveLink({
  children,
  className = '',
  href = '#',
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
} & React.RefAttributes<HTMLAnchorElement> &
  React.HTMLProps<HTMLAnchorElement>) {
  const pathname = usePathname();
  const isLinkActive =
    (!['/', '#', ''].includes(pathname ?? '') &&
      !['/', '#', ''].includes(href) &&
      pathname?.includes(href)) ??
    false;
  return (
    <Link
      className={`${className} ${isLinkActive ? 'active' : ''}`}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
