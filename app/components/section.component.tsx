export default function Section({
  children,
  className = '',
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.HTMLProps<HTMLElement>) {
  return (
    <section className={`relative mb-20 ${className}`} {...props}>
      {children}
    </section>
  );
}
