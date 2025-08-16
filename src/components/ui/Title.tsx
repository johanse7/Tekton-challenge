import { cn } from "@/lib/utils";

type TitleProps = {
  children: React.ReactNode;
  className?: string;
};

export const Title = ({ children, className }: TitleProps) => {
  return (
    <h1
      className={cn(
        "text-2xl font-bold text-gray-800 dark:text-gray-200",
        className
      )}
    >
      {children}
    </h1>
  );
};
