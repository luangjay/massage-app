import { type IconProps } from "@radix-ui/react-icons/dist/types";
import { Card } from "./ui/card";

type ServiceCardProps = {
  Icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  description: string;
};

export function ServiceCard({ Icon, title, description }: ServiceCardProps) {
  return (
    <Card className="flex flex-col items-center gap-6 p-8">
      <div className="rounded-full bg-accent-a3 p-3 text-accent-a11">
        <Icon className="h-8 w-8 shrink-0" />
      </div>
      <div className="flex flex-col items-center gap-3">
        <h3 className="text-xl font-medium leading-none">{title}</h3>
        <p className="text-center text-gray-11">{description}</p>
      </div>
    </Card>
  );
}
