import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";

import { Icons } from "@/components/gadget/icons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Task, TaskLabel, TaskPriority, TaskStatus, UpdateTask, updateTaskSchema } from "../schema/schema";

interface UpdateTaskSheetProps extends React.ComponentPropsWithRef<typeof Sheet> {
    task: Task;
}

export function UpdateTaskSheet({ task, ...props }: UpdateTaskSheetProps) {
    console.log("🚀 ~ UpdateTaskSheet ~ task:", task);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isUpdatePending, startUpdateTransition] = React.useTransition();

    const form = useForm<UpdateTask>({
        resolver: zodResolver(updateTaskSchema),
        defaultValues: {
            name: task.name,
            label: task.label,
            status: task.status,
            priority: task.priority,
            description: task.description,
            dueDate: task.dueDate,
            assignedUser: task.assignedUser,
        },
    });

    React.useEffect(() => {
        form.reset({
            name: task.name,
            label: task.label,
            status: task.status,
            priority: task.priority,
            description: task.description,
            dueDate: task.dueDate,
            assignedUser: task.assignedUser,
        });
    }, [task, form]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function onSubmit(values: UpdateTask) {
        // startUpdateTransition(async () => {
        //     // mutation.mutate(values, {
        //     //     onSuccess: () => {
        //     //         form.reset();
        //     //         toast.success("Task updated");
        //     //     },
        //     // });
        //     props.onOpenChange?.(false);
        // });
    }

    return (
        <Sheet {...props}>
            <SheetContent className="flex flex-col gap-6 sm:max-w-md">
                <SheetHeader className="text-left">
                    <SheetTitle>Update task</SheetTitle>
                    <SheetDescription>Update the task details and save the changes</SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-[calc(100dvh-200px)]">
                    <div className="h-full p-4 md:px-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Task name" value={field.value} onChange={field.onChange} />
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
                                                <Textarea
                                                    placeholder="Fix the bug..."
                                                    className="resize-none"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="label"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Label</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="capitalize">
                                                        <SelectValue placeholder="Select a label" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {Object.values(TaskLabel).map((item) => (
                                                            <SelectItem key={item} value={item} className="capitalize">
                                                                {item}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
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
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="capitalize">
                                                        <SelectValue placeholder="Select a status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {Object.values(TaskStatus).map((item) => (
                                                            <SelectItem key={item} value={item} className="capitalize">
                                                                {item}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="priority"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Priority</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="capitalize">
                                                        <SelectValue placeholder="Select a priority" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {Object.values(TaskPriority).map((item) => (
                                                            <SelectItem key={item} value={item} className="capitalize">
                                                                {item}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dueDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Due Date</FormLabel>
                                            <FormControl>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full justify-start text-left font-normal",
                                                                !field.value && "text-muted-foreground",
                                                            )}
                                                        >
                                                            <CalendarIcon className="w-4 h-4 mr-2" />
                                                            {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value ? (field.value, "PPP", new Date()) : undefined}
                                                            onSelect={(date) => field.onChange(date)}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="assignedUser"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Assigned User</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="capitalize">
                                                        <SelectValue placeholder="Select a user" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {/* Replace with dynamic user data */}
                                                        {["User1", "User2", "User3"].map((user) => (
                                                            <SelectItem key={user} value={user} className="capitalize">
                                                                {user}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                    </div>
                </ScrollArea>

                <SheetFooter className="gap-2 pt-2 sm:space-x-0">
                    <SheetClose asChild>
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </SheetClose>
                    <Button disabled={isUpdatePending} type="submit">
                        {isUpdatePending && <Icons.spinner className="mr-2 size-4 animate-spin" aria-hidden="true" />}
                        Save
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
