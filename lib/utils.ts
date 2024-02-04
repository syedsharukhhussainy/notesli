import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ICONS_SET } from "./constants";
import { LucideIcon } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getIconFile(iconName: string): LucideIcon | undefined {
  for (const iconSet of ICONS_SET) {
    const foundIcon = iconSet.icons.find((icon) => icon.iconName === iconName);
    if (foundIcon) {
      return foundIcon.iconFile;
    }
  }
}
