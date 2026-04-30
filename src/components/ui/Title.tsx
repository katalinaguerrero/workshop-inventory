import { cn } from "@/lib/utils";

type TitleProps = {
  title: string;
  className?: string;
};

export function Title({ title, className }: TitleProps) {
  return (
    <h1 className={cn("text-xl font-bold mb-4", className)}>
      {title}
    </h1>
  );
}