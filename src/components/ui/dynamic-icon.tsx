import { Icon } from "@iconify/react";

type DynamicIconProps = {
  name?: string;
  className?: string;
};

export function DynamicIcon({ name, className }: DynamicIconProps) {
  if (!name) return null;

  return <Icon icon={name} className={className} width="24" height="24" />;
}
