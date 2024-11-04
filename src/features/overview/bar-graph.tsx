import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export const description = "An interactive bar chart for project metrics";

// Sample project-related data (you can modify this to suit your needs)
const projectData = [
    { date: "2024-11-01", completed: 30, pending: 10 },
    { date: "2024-11-02", completed: 50, pending: 20 },
    { date: "2024-11-03", completed: 20, pending: 15 },
    { date: "2024-11-04", completed: 40, pending: 30 },
    { date: "2024-11-05", completed: 70, pending: 25 },
    { date: "2024-11-06", completed: 60, pending: 35 },
    { date: "2024-11-07", completed: 80, pending: 10 },
    { date: "2024-11-08", completed: 90, pending: 5 },
    { date: "2024-11-09", completed: 10, pending: 1 },
    { date: "2024-11-10", completed: 11, pending: 2 },
    { date: "2024-11-11", completed: 12, pending: 3 },
    { date: "2024-11-12", completed: 13, pending: 4 },
    { date: "2024-11-13", completed: 14, pending: 5 },
    { date: "2024-11-14", completed: 15, pending: 6 },
    { date: "2024-11-15", completed: 16, pending: 7 },
];

const chartConfig = {
    completed: {
        label: "Completed Tasks",
        color: "hsl(var(--chart-1))",
    },
    pending: {
        label: "Pending Tasks",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export function BarGraph() {
    const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("completed");

    const total = React.useMemo(
        () => ({
            completed: projectData.reduce((acc, curr) => acc + curr.completed, 0),
            pending: projectData.reduce((acc, curr) => acc + curr.pending, 0),
        }),
        [],
    );

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch p-0 space-y-0 border-b sm:flex-row">
                <div className="flex flex-col justify-center flex-1 gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Project Metrics - Interactive</CardTitle>
                    <CardDescription>Showing task completion metrics for the last week</CardDescription>
                </div>
                <div className="flex">
                    {["completed", "pending"].map((key) => {
                        const chart = key as keyof typeof chartConfig;
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-xs text-muted-foreground">{chartConfig[chart].label}</span>
                                <span className="text-lg font-bold leading-none sm:text-3xl">{total[chart].toLocaleString()}</span>
                            </button>
                        );
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer config={chartConfig} className="aspect-auto h-[280px] w-full">
                    <BarChart
                        accessibilityLayer
                        data={projectData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                });
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        });
                                    }}
                                />
                            }
                        />
                        <Bar dataKey={activeChart} fill={chartConfig[activeChart].color} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
