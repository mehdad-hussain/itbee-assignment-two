import ProjectCard from "@/components/ProjectCard";
import React from "react";

const projects = [
    {
        id: 1,
        name: "Project Alpha",
        description: "First project description",
        status: "In Progress",
        progress: 60,
        dueDate: "2024-11-30",
    },
    {
        id: 2,
        name: "Project Beta",
        description: "Second project description",
        status: "Completed",
        progress: 100,
        dueDate: "2024-10-15",
    },
    // More projects...
];

const ProjectOverview: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-semibold mb-4">Project Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default ProjectOverview;
