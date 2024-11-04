import PageContainer from "@/components/layouts/page-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/constants/mock-api";
import React from "react";

const ProjectOverview: React.FC = () => {
    const [overviewData, setOverviewData] = React.useState<{
        totalProjects: number;
        tasksInProgress: number;
        upcomingDeadlines: number;
        activeTeamMembers: number;
    }>();

    React.useEffect(() => {
        getOverviewData().then((data) => setOverviewData(data));
    }, []);

    const getOverviewData = async () => {
        const [totalProjects, tasksInProgress, upcomingDeadlines, activeTeamMembers] = await Promise.all([
            api.getTotalProjects(),
            api.getTasksInProgress(),
            api.getUpcomingDeadlines(),
            api.getActiveTeamMembers(),
        ]);
        return {
            totalProjects,
            tasksInProgress,
            upcomingDeadlines,
            activeTeamMembers,
        };
    };
    return (
        <PageContainer scrollable>
            <div className="space-y-2">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Hi, Welcome back 👋</h2>
                    <div className="items-center hidden space-x-2 md:flex">
                        {/* <CalendarDateRangePicker /> */}
                        <Button>Download</Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-4 h-4 text-muted-foreground"
                            >
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{overviewData?.totalProjects}</div>
                            <p className="text-xs text-muted-foreground">+{overviewData?.totalProjects} projects this month</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">Tasks in Progress</CardTitle>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-4 h-4 text-muted-foreground"
                            >
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{overviewData?.tasksInProgress}</div>
                            <p className="text-xs text-muted-foreground">+{overviewData?.tasksInProgress} tasks added this week</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-4 h-4 text-muted-foreground"
                            >
                                <rect width="20" height="14" x="2" y="5" rx="2" />
                                <path d="M2 10h20" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{overviewData?.upcomingDeadlines}</div>
                            <p className="text-xs text-muted-foreground">{overviewData?.upcomingDeadlines} deadlines this week</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">Active Team Members</CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-4 h-4 text-muted-foreground"
                            >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{overviewData?.activeTeamMembers}</div>
                            <p className="text-xs text-muted-foreground">{overviewData?.activeTeamMembers} online now</p>
                        </CardContent>
                    </Card>
                </div>
                {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <div className="col-span-4">
                                <BarGraph />
                            </div>
                            <Card className="col-span-4 md:col-span-3">
                                <CardHeader>
                                    <CardTitle>Recent Sales</CardTitle>
                                    <CardDescription>You made 265 sales this month.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <RecentSales />
                                </CardContent>
                            </Card>
                            <div className="col-span-4">
                                <AreaGraph />
                            </div>
                            <div className="col-span-4 md:col-span-3">
                                <PieGraph />
                            </div>
                        </div> */}
            </div>
        </PageContainer>
    );
};

export default ProjectOverview;
