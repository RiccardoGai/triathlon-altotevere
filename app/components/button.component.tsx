import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export default function Button({
  variant = 'primary',
  className,
  text,
  type,
  href,
  ...props
}: {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link';
  className?: string;
  text: string;
  type: 'button' | 'submit' | 'reset' | 'link';
  href?: string;
}) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    tertiary: 'btn btn-tertiary',
    link: 'cursor-pointer hover:text-primary'
  };

  return (
    <>
      {(type === 'button' || type === 'submit' || type === 'reset') && (
        <button
          type={type}
          className={twMerge(variants[variant] || '', className)}
          {...props}
        >
          {text}
        </button>
      )}
      {type === 'link' && (
        <Link
          className={twMerge(variants[variant] || '', className)}
          href={href!}
          {...props}
        >
          {text}
        </Link>
      )}
    </>
  );
}
