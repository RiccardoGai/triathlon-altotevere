import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export default function Button({
  variant = 'primary',
  className,
  type,
  href,
  children,
  ...props
}: (React.HTMLProps<HTMLButtonElement> | React.HTMLProps<HTMLAnchorElement>) & {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'outline' | 'ghost' | 'link';
  className?: string;
  type: 'button' | 'submit' | 'reset' | 'link';
  href?: string;
  children: React.ReactNode;
}) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    tertiary: 'btn-tertiary',
    accent: 'btn-accent',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
    link: 'inline-flex items-center font-semibold cursor-pointer text-primary hover:text-primary-dark transition-colors duration-200',
  };

  const inExternalLink = type === 'link' && href?.startsWith('http');

  return (
    <>
      {(type === 'button' || type === 'submit' || type === 'reset') && (
        <button
          type={type as any}
          className={twMerge(variants[variant] || '', className)}
          {...(props as React.HTMLProps<HTMLButtonElement>)}
        >
          {children}
        </button>
      )}
      {type === 'link' && (
        <Link
          className={twMerge(variants[variant] || '', className)}
          passHref={inExternalLink}
          target={inExternalLink ? '_blank' : undefined}
          href={href!}
          {...(props as React.HTMLProps<HTMLAnchorElement>)}
        >
          {children}
        </Link>
      )}
    </>
  );
}
