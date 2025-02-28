export default function Container({
  children,
  className = '',
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={`container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
