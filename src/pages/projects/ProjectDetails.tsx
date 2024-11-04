import { columns } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";
import PageContainer from "@/components/layouts/page-container";
import { taskSchema } from "@/features/task/schema/schema";
import { z } from "zod";

const ProjectDetails = () => {
    // const [tasks, setTasks] = useState<any[]>([]);
    // console.log("🚀 ~ ProjectDetails ~ tasks:", tasks);

    // useEffect(() => {
    //     const getTasks = async () => {
    //         const res = await api.getTasks(1);
    //         console.log("🚀 ~ getTasks ~ res:", res);
    //         setTasks(res);
    //     };
    //     getTasks();
    // }, []);

    const tasks: z.infer<typeof taskSchema>[] = [
        {
            id: 1,
            name: "Dummy task 1",
            description: "This is a dummy task description",
            status: "todo",
            priority: "low",
            dueDate: "2024-03-15",
            label: "bug",
            assignedUser: "John Doe",
        },
        {
            id: 2,
            name: "Dummy task 2",
            description: "This is another dummy task description",
            status: "backlog",
            priority: "high",
            dueDate: "2024-04-01",
            label: "feature",
            assignedUser: "Jane Smith",
        },
        {
            id: 3,
            name: "Dummy task 3",
            description: "This is a dummy task description with a long text",
            status: "in progress",
            priority: "medium",
            dueDate: "2024-03-20",
            label: "bug",
            assignedUser: "Bob Johnson",
        },
        {
            id: 4,
            name: "Dummy task 4",
            description: "This is a dummy task description with a short text",
            status: "done",
            priority: "low",
            dueDate: "2024-02-15",
            label: "feature",
            assignedUser: "Alice Brown",
        },
        {
            id: 5,
            name: "Dummy task 5",
            description: "This is a dummy task description with a very long text",
            status: "canceled",
            priority: "high",
            dueDate: "2024-05-01",
            label: "bug",
            assignedUser: "Mike Davis",
        },
    ];

    return (
        <PageContainer>
            <DataTable data={tasks} columns={columns} />
        </PageContainer>
    );
};

export default ProjectDetails;
