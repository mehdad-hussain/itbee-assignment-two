import { Task } from "@/features/task/schema/schema";
import { labels, priorities, statuses } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "../../../components/data-table/data-table-column-header";
import { DataTableRowActions } from "../../../components/data-table/data-table-row-actions";
import { Badge } from "../../../components/ui/badge";
import { Checkbox } from "../../../components/ui/checkbox";

export const columns: ColumnDef<Task>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Task ID" />,
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
        cell: ({ row }) => {
            const label = labels.find((label) => label.value === row.original.label);

            return (
                <div className="flex space-x-2  w-[250px]">
                    {label && (
                        <Badge variant={label.value === "bug" ? "destructive" : label.value === "feature" ? "default" : "outline"}>
                            {label.label}
                        </Badge>
                    )}
                    <span className="max-w-[500px] truncate font-medium">{row.getValue("name")}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => {
            const status = statuses.find((status) => status.value === row.getValue("status"));

            if (!status) {
                return null;
            }

            return (
                <div className="flex w-[100px] items-center">
                    {status.icon && <status.icon className="w-4 h-4 mr-2 text-muted-foreground" />}
                    <span>{status.label}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "priority",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Priority" />,
        cell: ({ row }) => {
            const priority = priorities.find((priority) => priority.value === row.getValue("priority"));

            if (!priority) {
                return null;
            }

            return (
                <div className="flex items-center">
                    {priority.icon && <priority.icon className="w-4 h-4 mr-2 text-muted-foreground" />}
                    <span>{priority.label}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "dueDate",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Due Date" />,
        cell: ({ row }) => format(new Date(row.getValue("dueDate")), "MMM dd, y"),
    },
    {
        accessorKey: "assignedUser",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Assigned User" />,
        cell: ({ row }) => row.getValue("assignedUser"),
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];
