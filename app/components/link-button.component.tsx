import Link from 'next/link';

export default function LinkButton({
  href,
  type = 'button',
  className,
  children
}: {
  href: string;
  type?: 'button' | 'outline' | 'text';
  className?: string;
  children?: React.ReactNode;
}) {
  let cssClass = `link-button ${className ?? ''}`;
  if (type === 'outline') {
    cssClass = `${cssClass} link-button__outline`;
  } else if (type === 'text') {
    cssClass = `${cssClass} link-button__text`;
  }

  return (
    <Link href={href} className={cssClass}>
      {children}
    </Link>
  );
}
