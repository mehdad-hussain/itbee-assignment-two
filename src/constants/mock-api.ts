import { Project, Task, TaskLabel, TaskPriority, TaskStatus } from "@/features/task/schema/schema";
import { faker } from "@faker-js/faker";

const projects: Project[] = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
    status: faker.helpers.arrayElement(["in-progress", "completed", "pending"]),
    dueDate: faker.date.future().toISOString(),
    progress: faker.helpers.arrayElement([0, 25, 50, 75, 100]),
    tasks: Array.from({ length: 50 }, (_, taskIndex) => ({
        id: taskIndex + 1,
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        status: faker.helpers.arrayElement([
            TaskStatus.TODO,
            TaskStatus.BACKLOG,
            TaskStatus.IN_PROGRESS,
            TaskStatus.DONE,
            TaskStatus.CANCELED,
        ]),
        priority: faker.helpers.arrayElement([TaskPriority.HIGH, TaskPriority.MEDIUM, TaskPriority.LOW]),
        label: faker.helpers.arrayElement([TaskLabel.BUG, TaskLabel.FEATURE, TaskLabel.DOCUMENTATION]),
        dueDate: faker.date.future(),
        assignedUser: faker.person.fullName(),
    })),
}));

const totalProjects = projects.length;
const tasksInProgress = projects.reduce((acc, project) => {
    return acc + project.tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS).length;
}, 0);
const upcomingDeadlines = projects.reduce((acc, project) => {
    return (
        acc +
        project.tasks.filter((task) => {
            const dueDate = new Date(task.dueDate);
            const today = new Date();
            return dueDate.getTime() - today.getTime() < 7 * 24 * 60 * 60 * 1000;
        }).length
    );
}, 0);
const activeTeamMembers = projects.reduce((acc, project) => {
    return acc + new Set(project.tasks.map((task) => task.assignedUser)).size;
}, 0);

const api = {
    getProjects: async () => {
        return projects;
    },
    getProject: async (id: number) => {
        return projects.find((project) => project.id === id);
    },
    getTasks: async (projectId: number) => {
        const project = projects.find((project) => project.id === projectId);
        return project?.tasks || [];
    },
    getTask: async (projectId: number, taskId: number) => {
        const project = projects.find((project) => project.id === projectId);
        return project?.tasks.find((task) => task.id === taskId);
    },
    createTask: async (projectId: number, task: Task) => {
        const project = projects.find((project) => project.id === projectId);
        if (project) {
            project.tasks.push(task);
            return task;
        }
        throw new Error("Project not found");
    },
    updateTask: async (projectId: number, taskId: number, task: Task) => {
        const project = projects.find((project) => project.id === projectId);
        if (project) {
            const taskIndex = project.tasks.findIndex((task) => task.id === taskId);
            if (taskIndex !== -1) {
                project.tasks[taskIndex] = task;
                return task;
            }
        }
        throw new Error("Task not found");
    },
    deleteTask: async (projectId: number, taskId: number) => {
        const project = projects.find((project) => project.id === projectId);
        if (project) {
            const taskIndex = project.tasks.findIndex((task) => task.id === taskId);
            if (taskIndex !== -1) {
                project.tasks.splice(taskIndex, 1);
                return true;
            }
        }
        throw new Error("Task not found");
    },

    getTotalProjects: async () => {
        return totalProjects;
    },
    getTasksInProgress: async () => {
        return tasksInProgress;
    },
    getUpcomingDeadlines: async () => {
        return upcomingDeadlines;
    },
    getActiveTeamMembers: async () => {
        return activeTeamMembers;
    },
};

export default api;
