import { Component1Icon } from "@radix-ui/react-icons";

export function Logo() {
  return (
    <div className="flex flex-col items-center gap-2 p-1 drop-shadow-lg">
      <Component1Icon className="h-7 w-7 shrink-0" />
      <p className="font-brand text-3xl font-bold leading-7 tracking-wider">
        Florandle
      </p>
    </div>
  );
}
