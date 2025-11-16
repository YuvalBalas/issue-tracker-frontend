import {
  IssueTrackerTable,
  IssuetrackerStats,
} from "@/IssueTracker/components";
import { useEffect, useState } from "react";
import type { Issue } from "./types";
import { getIssues } from "./services";

export function IssueTrackerPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  const updateIssue = (id: string, data: Partial<Issue>) => {
    setIssues((prev) =>
      prev.map((issue) => (issue.id === id ? { ...issue, ...data } : issue))
    );
  };

  const deleteIssue = (id: string) => {
    setIssues((prev) => prev.filter((issue) => issue.id !== id));
  };

  const addIssue = (newIssue: Issue) => {
    setIssues((prev) => [newIssue, ...prev]);
  };

  useEffect(() => {
    getIssues()
      .then((data) => setIssues(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return (
    <>
      <IssueTrackerTable
        data={issues}
        onIssueUpdate={updateIssue}
        onIssueDelete={deleteIssue}
        onIssueAddition={addIssue}
      />
      <IssuetrackerStats data={issues} />
    </>
  );
}
