import React from "react";

interface Project {
    id: number;
    name: string;
    description: string;
    status: string;
    progress: number;
    dueDate: string;
}

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <h2 className="text-lg font-semibold">{project.name}</h2>
            <p className="text-sm text-gray-500">{project.description}</p>
            <div className="flex justify-between items-center mt-2">
                <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        project.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                >
                    {project.status}
                </span>
                <span className="text-sm text-gray-400">Due: {project.dueDate}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
            </div>
        </div>
    );
};

export default ProjectCard;
