"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useTaskStore } from "@/store/kanbanStore";

export default function NewTaskDialog() {
    const addTask = useTaskStore((state) => state.addTask);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const { title, description } = Object.fromEntries(formData);

        if (typeof title !== "string" || typeof description !== "string") return;
        addTask(title, description);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" size="sm">
                    ＋ Add New Task
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogDescription>What do you want to get done today?</DialogDescription>
                </DialogHeader>
                <form id="todo-form" className="grid gap-4 py-4" onSubmit={handleSubmit}>
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Input id="title" name="title" placeholder="Todo title..." className="col-span-4" />
                    </div>
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Textarea id="description" name="description" placeholder="Description..." className="col-span-4" />
                    </div>
                </form>
                <DialogFooter>
                    <DialogTrigger asChild>
                        <Button type="submit" size="sm" form="todo-form">
                            Add Task
                        </Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
