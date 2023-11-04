export default function Section({
  children,
  className = '',
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.HTMLProps<HTMLElement>) {
  return (
    <section className={`flex-1 relative mb-20 ${className}`} {...props}>
      {children}
    </section>
  );
}
