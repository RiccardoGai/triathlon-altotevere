export const Container = ({
  children,
  className = '',
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  props?: any;
}) => {
  return (
    <div className={`container mx-auto px-6 sm:px-8 ${className}`} {...props}>
      {children}
    </div>
  );
};
