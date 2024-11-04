import PageContainer from "@/components/layouts/page-container";
import { Heading } from "@/components/ui/heading";
import { KanbanBoard } from "@/features/kanban/kanban-board";
import NewTaskDialog from "@/features/kanban/new-task-dialog";

const Kanban = () => {
    return (
        <PageContainer>
            <div className="space-y-4">
                <div className="flex items-start justify-between">
                    <Heading title={`Kanban`} description="Manage tasks by dnd" />
                    <NewTaskDialog />
                </div>
                <KanbanBoard />
            </div>
        </PageContainer>
    );
};

export default Kanban;
