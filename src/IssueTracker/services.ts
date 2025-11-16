import { z } from "zod";
import type { addIssueSchema } from "./schemas";

const ISSUES_ENDPOINT = `${import.meta.env.VITE_BACKEND_URL}/api/issues`;

export async function getIssues() {
  const res = await fetch(ISSUES_ENDPOINT);
  if (!res.ok) throw new Error("Failed to fetch issues");
  return res.json();
}

export async function createIssue(issue: z.infer<typeof addIssueSchema>) {
  const res = await fetch(ISSUES_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(issue),
  });

  if (!res.ok) throw new Error("Failed to create issue");
  return res.json();
}

export async function updateIssue(id: string, data: Record<string, any>) {
  const res = await fetch(`${ISSUES_ENDPOINT}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update issue");
  return res.json();
}

export async function deleteIssue(id: string) {
  const res = await fetch(`${ISSUES_ENDPOINT}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete issue");
  return res.json();
}
