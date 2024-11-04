import { TrendingUp } from "lucide-react";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
    { category: "Projects", count: 24, fill: "var(--color-projects)" },
    { category: "Tasks", count: 75, fill: "var(--color-tasks)" },
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

export function PieGraph() {
    const totalItems = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.count, 0);
    }, []);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Project and Task Distribution</CardTitle>
                <CardDescription>Current Project and Task Counts</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[360px]">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie data={chartData} dataKey="count" nameKey="category" innerRadius={60} strokeWidth={5}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                <tspan x={viewBox.cx} y={viewBox.cy} className="text-3xl font-bold fill-foreground">
                                                    {totalItems.toLocaleString()}
                                                </tspan>
                                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                                    Total
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="w-4 h-4" />
                </div>
                <div className="leading-none text-muted-foreground">Displaying total projects and tasks</div>
            </CardFooter>
        </Card>
    );
}
