import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Project } from "@/types/types";
import { format } from "date-fns";
import React from "react";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const navigate = useNavigate();
    return (
        <Card className="p-4 border border-gray-200 shadow-md cursor-pointer" onClick={() => navigate(`/dashboard/projects/${project.id}`)}>
            <CardHeader>
                <CardTitle className="text-lg font-semibold">{project.name}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground line-clamp-2">{project.description}...</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between mt-2">
                    <Badge
                        className="capitalize p-1.5"
                        variant={project.status === "pending" ? "default" : project.status === "in-progress" ? "secondary" : "outline"}
                    >
                        {project.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                        {project.status === "completed" ? "Completed" : "Due"}: {format(new Date(project.dueDate), "MMM dd, yyyy")}
                    </span>
                </div>
                <Progress value={project.progress} className="mt-3" />
            </CardContent>
        </Card>
    );
};

export default ProjectCard;
