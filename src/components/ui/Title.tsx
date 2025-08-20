import { cn } from "@/lib/utils";

type TitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  className?: string;
  children: React.ReactNode;
};

export const Title = ({ children, className, ...rest }: TitleProps) => {
  return (
    <h1
      className={cn(
        "text-2xl font-bold text-gray-800 dark:text-gray-200",
        className
      )}
      {...rest}
    >
      {children}
    </h1>
  );
};
