import { format } from "date-fns";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Clock, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { searchFilter, selectFilters } from "@/IssueTracker/consts";
import type { Issue, IssueStatus } from "@/IssueTracker/types";
import { ChartBar } from "@/components/ui/bar-chart";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { countByKey } from "./utils";
import { createIssue, deleteIssue, updateIssue } from "./services";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { addIssueSchema } from "./schemas";

export const issueTableColumns = (
  onIssueUpdate: (id: string, data: Partial<Issue>) => void,
  onIssueDelete: (id: string) => void
): ColumnDef<Issue>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
  {
    accessorKey: "site",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Site" />
    ),
  },
  {
    accessorKey: "severity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Severity" />
    ),
    cell: ({ row }) => {
      const severity = row.getValue("severity") as string;
      let icon, color;

      switch (severity) {
        case "minor":
          icon = <Clock className="w-3 h-3 mr-1" />;
          color = "text-green-200";
          break;
        case "major":
          icon = <Zap className="w-3 h-3 mr-1" />;
          color = "text-amber-200";
          break;
        case "critical":
          icon = <AlertCircle className="w-3 h-3 mr-1" />;
          color = "text-red-300";
          break;
      }

      return (
        <Badge variant="outline">
          <div className={`flex items-center font-medium ${color}`}>
            {icon}
            {severity.charAt(0).toUpperCase() + severity.slice(1)}
          </div>
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const issue = row.original;
      const status = row.getValue("status") as string;

      const handleChange = async (newStatus: string) => {
        onIssueUpdate(issue.id, { status: newStatus as IssueStatus });

        try {
          await updateIssue(issue.id, { status: newStatus });
        } catch (err) {
          console.error(err);
        }
      };

      return (
        <div className={`flex items-center`}>
          <Select value={status} onValueChange={handleChange}>
            <SelectTrigger className="w-[120px] text-xs">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="text-xs">
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return <span>{format(new Date(date), "MMM d, yyyy HH:mm")}</span>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as Date;
      return <span>{format(new Date(date), "MMM d, yyyy HH:mm")}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const issue = row.original;

      const handleDelete = async () => {
        onIssueDelete(issue.id);

        try {
          await deleteIssue(issue.id);
        } catch (err) {
          console.error(err);
        }
      };

      return (
        <Button variant="outline" onClick={handleDelete}>
          Delete
        </Button>
      );
    },
  },
];

export function IssueTrackerTable({
  data,
  onIssueUpdate,
  onIssueDelete,
  onIssueAddition,
}: {
  data: Issue[];
  onIssueUpdate: (id: string, data: Partial<Issue>) => void;
  onIssueDelete: (id: string) => void;
  onIssueAddition: (issue: Issue) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <DataTable
        columns={issueTableColumns(onIssueUpdate, onIssueDelete)}
        data={data}
        searchFilter={searchFilter}
        selectFilters={selectFilters}
        actions={<IssueAddForm onIssueAddition={onIssueAddition} />}
      />
    </div>
  );
}

export function IssuetrackerStats({ data }: { data: Issue[] }) {
  const issuesByStatuses = countByKey(data, "status");
  const issuesBySeverities = countByKey(data, "severity");

  return (
    <>
      <Card className="mt-10 border-0">
        <CardHeader>
          <CardTitle>Overall Overview</CardTitle>
          <CardDescription>Status and Sevirity by category</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <ChartBar
            title={"Status"}
            dataKey={"status"}
            desc={"Issues by status"}
            data={issuesByStatuses}
          />
          <ChartBar
            title={"Severity"}
            dataKey={"severity"}
            desc={"Issues by severity"}
            data={issuesBySeverities}
          />
        </CardContent>
      </Card>
    </>
  );
}

export default function IssueAddForm({
  onIssueAddition,
}: {
  onIssueAddition: (issue: Issue) => void;
}) {
  const form = useForm<z.infer<typeof addIssueSchema>>({
    resolver: zodResolver(addIssueSchema),
  });

  const handleIssueAddition = async (
    values: z.infer<typeof addIssueSchema>
  ) => {
    try {
      const createdIssue = await createIssue(values);
      onIssueAddition(createdIssue);
      toast.success("Issue has been created");
    } catch (err) {
      console.error(err);
      toast.error("Issue creation failed");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Issue</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Issue</DialogTitle>
          <DialogDescription>
            This form is for adding new issue
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleIssueAddition)}
                className="space-y-8 max-w-3xl mx-auto py-10"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="title..." type="text" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="description..."
                          type="text"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="site"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Site</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="optional site..."
                          type="text"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="severity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Severity</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select the issue severity" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="minor">Minor</SelectItem>
                          <SelectItem value="major">Major</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select the issue status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="in_progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogClose asChild>
                  <Button type="submit">Submit</Button>
                </DialogClose>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
