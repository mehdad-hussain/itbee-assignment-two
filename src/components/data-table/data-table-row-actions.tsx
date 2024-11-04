import { DeleteTasksDialog } from "@/features/task/components/delete-tasks-dialog";
import { UpdateTaskSheet } from "@/features/task/components/update-task-sheet";
import { Task } from "@/features/task/schema/schema";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { type Row } from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
export function DataTableRowActions({ row }: { row: Row<Task> }) {
    const [showUpdateTaskSheet, setShowUpdateTaskSheet] = useState(false);
    const [showDeleteTaskDialog, setShowDeleteTaskDialog] = useState(false);
    return (
        <>
            <UpdateTaskSheet open={showUpdateTaskSheet} onOpenChange={setShowUpdateTaskSheet} task={row.original} />
            <DeleteTasksDialog
                open={showDeleteTaskDialog}
                onOpenChange={setShowDeleteTaskDialog}
                task={row.original}
                showTrigger={false}
                onSuccess={() => row.toggleSelected(false)}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
                        <DotsHorizontalIcon className="w-4 h-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem onSelect={() => setShowUpdateTaskSheet(true)}>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => setShowDeleteTaskDialog(true)}>
                        Delete
                        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
