import ProjectCard from "@/components/gadget/ProjectCard";
import PageContainer from "@/components/layouts/page-container";
import api from "@/constants/mock-api";
import { Project } from "@/types/types";
import { useEffect, useState } from "react";

const ProjectList = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        api.getProjects().then((projects) => setProjects(projects));
    }, []);

    return (
        <PageContainer scrollable>
            <h1 className="text-2xl font-semibold mb-4">Project Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </PageContainer>
    );
};
export default ProjectList;
