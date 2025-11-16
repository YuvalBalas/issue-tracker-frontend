import type { LucideIcon } from "lucide-react";

export type SelectFilterOption = {
  value: string;
  label: string;
  icon?: LucideIcon;
};

export type SelectFilter = {
  column: string;
  title: string;
  options: SelectFilterOption[];
};

export type SearchFilter = {
  column: string;
  placeholder?: string;
};
