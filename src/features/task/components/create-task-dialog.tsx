import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";

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

import { useState, useTransition } from "react";
import { useMedia } from "react-use";
import { toast } from "sonner";
import { CreateTask, createTaskSchema } from "../schema/schema";
import { CreateTaskForm } from "./create-task-form";

export function CreateTaskDialog() {
    const [open, setOpen] = useState(false);
    const isDesktop = useMedia("(min-width: 640px)", false);

    const [isCreatePending, startCreateTransition] = useTransition();

    const form = useForm<CreateTask>({
        resolver: zodResolver(createTaskSchema),
    });

    function onSubmit() {
        startCreateTransition(() => {
            setOpen(false);
            toast.promise(
                new Promise((resolve) => {
                    setTimeout(() => {
                        form.reset();
                        resolve(true);
                    }, 1000);
                }),
                {
                    loading: "Creating task...",
                    success: "Task created successfully",
                    error: "Failed to create task",
                },
            );
        });
    }

    if (isDesktop)
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                        <PlusIcon className="mr-2 size-4" aria-hidden="true" />
                        New task
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create task</DialogTitle>
                        <DialogDescription>Fill in the details below to create a new task.</DialogDescription>
                    </DialogHeader>
                    <CreateTaskForm form={form} onSubmit={onSubmit}>
                        <DialogFooter className="gap-2 pt-2 sm:space-x-0">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button disabled={isCreatePending}>
                                {isCreatePending && <ReloadIcon className="mr-2 size-4 animate-spin" aria-hidden="true" />}
                                Create
                            </Button>
                        </DialogFooter>
                    </CreateTaskForm>
                </DialogContent>
            </Dialog>
        );

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" size="sm">
                    <PlusIcon className="mr-2 size-4" aria-hidden="true" />
                    New task
                </Button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Create task</DrawerTitle>
                    <DrawerDescription>Fill in the details below to create a new task.</DrawerDescription>
                </DrawerHeader>
                <div className="p-2">
                    <CreateTaskForm form={form} onSubmit={onSubmit}>
                        <DrawerFooter className="gap-2 sm:space-x-0">
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                            <Button disabled={isCreatePending}>
                                {isCreatePending && <ReloadIcon className="mr-2 size-4 animate-spin" aria-hidden="true" />}
                                Create
                            </Button>
                        </DrawerFooter>
                    </CreateTaskForm>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
