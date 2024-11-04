import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const projectData = [
    { month: "January", projects: 10, tasks: 45 },
    { month: "February", projects: 12, tasks: 50 },
    { month: "March", projects: 15, tasks: 55 },
    { month: "April", projects: 18, tasks: 60 },
    { month: "May", projects: 22, tasks: 65 },
    { month: "June", projects: 24, tasks: 70 },
];

const chartConfig = {
    projects: {
        label: "Projects",
        color: "hsl(var(--chart-1))",
    },
    tasks: {
        label: "Tasks",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export function AreaGraph() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Area Chart - Project and Task Data</CardTitle>
                <CardDescription>Showing total projects and tasks for the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="aspect-auto h-[310px] w-full">
                    <AreaChart
                        accessibilityLayer
                        data={projectData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                        <Area
                            dataKey="tasks"
                            type="natural"
                            fill="var(--color-tasks)"
                            fillOpacity={0.4}
                            stroke="var(--color-tasks)"
                            stackId="a"
                        />
                        <Area
                            dataKey="projects"
                            type="natural"
                            fill="var(--color-projects)"
                            fillOpacity={0.4}
                            stroke="var(--color-projects)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex items-start w-full gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by 5.2% this month <TrendingUp className="w-4 h-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">January - June 2024</div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
