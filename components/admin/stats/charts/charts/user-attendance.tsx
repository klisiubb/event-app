"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { BorderBeam } from "@/components/ui/border-beam";

type UserAttendanceChartProps = {
  totalUsers: number;
  presentUsers: number;
};

export default function UserAttendanceChart({
  totalUsers,
  presentUsers,
}: UserAttendanceChartProps) {
  const absentUsers = totalUsers - presentUsers;

  const data = [
    { name: "Present", value: presentUsers },
    { name: "Not Confirmed", value: absentUsers },
  ];

  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-5))"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="w-full relative overflow-hidden">
      <BorderBeam />
      <CardHeader>
        <CardTitle>User Attendance Overview</CardTitle>
        <CardDescription>
          Comparison of registered users vs. confirmed attendees
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            Present: {
              label: "Present",
              color: COLORS[0],
            },
            NotConfirmed: {
              label: "Not Confirmed",
              color: COLORS[1],
            },
          }}
          className="min-h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 text-left">
          <p className="text-sm font-medium">
            Total Registered Users: {totalUsers} | Confirmed Attendees:{" "}
            {presentUsers}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
