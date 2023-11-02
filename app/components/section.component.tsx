export const Section = ({
  children,
  className = '',
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  props?: any;
}) => {
  return (
    <section className={`flex-1 relative mb-20 ${className}`} {...props}>
      {children}
    </section>
  );
};
