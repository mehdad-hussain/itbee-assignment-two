"use client";

import { Icons } from "@/components/gadget/icons";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { TrashIcon } from "@radix-ui/react-icons";
import { type Row } from "@tanstack/react-table";
import * as React from "react";
import { useMedia } from "react-use";
import { toast } from "sonner";
import { Task } from "../schema/schema";

interface DeleteTasksDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
    task: Row<Task>["original"];
    showTrigger?: boolean;
}

export function DeleteTasksDialog({ task, showTrigger = true, ...props }: DeleteTasksDialogProps) {
    const [isDeletePending, startDeleteTransition] = React.useTransition();
    const isDesktop = useMedia("(min-width: 640px)", false);

    function onDelete() {
        startDeleteTransition(() => {
            props.onOpenChange?.(false);
            toast.success("Task deleted successfully");
        });
    }

    if (isDesktop) {
        return (
            <Dialog {...props}>
                {showTrigger ? (
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
                            Delete
                        </Button>
                    </DialogTrigger>
                ) : null}
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your
                            <span className="font-medium"> {task.name}</span>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:space-x-0">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button aria-label="Delete selected rows" variant="destructive" onClick={onDelete} disabled={isDeletePending}>
                            {isDeletePending && <Icons.spinner className="mr-2 size-4 animate-spin" aria-hidden="true" />}
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer {...props}>
            {showTrigger ? (
                <DrawerTrigger asChild>
                    <Button variant="outline" size="sm">
                        <TrashIcon className="mr-2 size-4" aria-hidden="true" />
                        Delete
                    </Button>
                </DrawerTrigger>
            ) : null}
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>
                        This action cannot be undone. This will permanently delete your <span className="font-medium">{task.name}</span>{" "}
                        task.
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="gap-2 sm:space-x-0">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                    <Button aria-label="Delete selected rows" variant="destructive" onClick={onDelete} disabled={isDeletePending}>
                        {isDeletePending && <Icons.spinner className="mr-2 size-4 animate-spin" aria-hidden="true" />}
                        Delete
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
