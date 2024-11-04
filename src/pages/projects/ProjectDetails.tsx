import { DataTable } from "@/components/data-table/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import PageContainer from "@/components/layouts/page-container";
import api from "@/constants/mock-api";
import { columns } from "@/features/task/components/columns";
import { Project, Task } from "@/features/task/schema/schema";
import { Suspense, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

const ProjectDetails = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [project, setProject] = useState<Project>();

    useEffect(() => {
        const getTasks = async () => {
            if (projectId) {
                const res = await api.getTasks(Number(projectId));
                setTasks(res);
            }
        };
        getTasks();

        const getProject = async () => {
            if (projectId) {
                const res = await api.getProject(Number(projectId));
                setProject(res);
            }
        };
        getProject();
    }, [projectId]);

    return (
        <PageContainer>
            <h1 className="mb-4 text-2xl font-semibold">{project?.name}</h1>
            <Suspense
                fallback={
                    <DataTableSkeleton
                        columnCount={5}
                        searchableColumnCount={1}
                        filterableColumnCount={2}
                        cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
                        shrinkZero
                    />
                }
            >
                <DataTable data={tasks} columns={columns} />
            </Suspense>
        </PageContainer>
    );
};

export default ProjectDetails;
