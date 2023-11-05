export default function Container({
  children,
  className = '',
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.HTMLProps<HTMLDivElement>) {
  return (
    <div className={`container mx-auto px-6 sm:px-8 ${className}`} {...props}>
      {children}
    </div>
  );
}
