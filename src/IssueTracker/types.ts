export type IssueSeverity = "minor" | "major" | "critical";
export type IssueStatus = "open" | "in_progress" | "resolved";

export type Issue = {
  id: string;
  title: string;
  description: string;
  site?: string;
  severity: IssueSeverity;
  status: IssueStatus;
  createdAt: Date;
  updatedAt: Date;
};
