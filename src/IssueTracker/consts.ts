import { AlertCircle, CheckCircle, Clock, Zap } from "lucide-react";
import type {
  SearchFilter,
  SelectFilter,
  SelectFilterOption,
} from "@/components/ui/data-table-types";

export const searchFilter: SearchFilter = {
  column: "title",
  placeholder: "Filter by title..",
};

export const statuses: SelectFilterOption[] = [
  {
    value: "open",
    label: "Open",
    icon: Clock,
  },
  {
    value: "in_progress",
    label: "In Progress",
    icon: Zap,
  },
  {
    value: "resolved",
    label: "Resolved",
    icon: CheckCircle,
  },
];

export const severities: SelectFilterOption[] = [
  {
    value: "minor",
    label: "Minor",
    icon: Clock,
  },
  {
    value: "major",
    label: "Major",
    icon: Zap,
  },
  {
    value: "critical",
    label: "Critical",
    icon: AlertCircle,
  },
];

export const selectFilters: SelectFilter[] = [
  {
    column: "status",
    title: "Status",
    options: statuses,
  },
  {
    column: "severity",
    title: "Severity",
    options: severities,
  },
];
