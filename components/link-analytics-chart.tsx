"use client";
import React, { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const chartConfig = {
    clicks: {
        label: "Clicks",
        color: "#2563eb",
    },
} satisfies ChartConfig;

interface LinkClickDate {
    date: string;
    clicks: number;
}

interface LinkAnalyticsChartProps {
    linkClickDate: LinkClickDate[];
    dateRange?: string;
}

export default function LinkAnalyticsChart({
    linkClickDate,
    dateRange,
}: LinkAnalyticsChartProps) {
    const [chartData, setChartData] = useState<LinkClickDate[]>(linkClickDate);

    useEffect(() => {
        if (dateRange) {
            const today = new Date();
            const startDate = new Date();

            if (dateRange === "7days") {
                startDate.setDate(today.getDate() - 7);
            } else if (dateRange === "30days") {
                startDate.setDate(today.getDate() - 30);
            } else if (dateRange === "90days") {
                startDate.setDate(today.getDate() - 90);
            } else if (dateRange === "allTime") {
                startDate.setFullYear(today.getFullYear() - 1000);
            }

            const filteredData = linkClickDate.filter((data) => {
                const dataDate = new Date(
                    `${data.date} ${today.getFullYear()}`
                );
                return dataDate >= startDate;
            });
            console.log("Filtered Data:", filteredData);
            setChartData(filteredData);
        }
    }, [dateRange, linkClickDate]);

    if (linkClickDate.length <= 1) {
        return (
            <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-gray-500">
                After your link has been active an used for a few days, you will
                see the clicks chart here.
            </div>
        );
    }

    return (
        <Card>
            <CardHeader className="text-xl font-bold">Clicks Chart</CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="min-h-[200px] max-h-[450px] w-full"
                >
                    <BarChart accessibilityLayer data={chartData}>
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12 }}
                            interval={0}
                            height={40}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <CartesianGrid vertical={false} />
                        <Bar dataKey="clicks" fill="#2563eb" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
