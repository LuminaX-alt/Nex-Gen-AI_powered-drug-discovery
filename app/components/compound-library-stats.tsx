"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const libraryData = [
  { category: "Kinase Inhibitors", count: 2847, success: 78 },
  { category: "Antibiotics", count: 1923, success: 65 },
  { category: "Antivirals", count: 1456, success: 82 },
  { category: "Oncology", count: 3421, success: 71 },
  { category: "CNS Drugs", count: 1876, success: 69 },
  { category: "Cardiovascular", count: 1324, success: 85 },
]

const chartConfig = {
  count: {
    label: "Compound Count",
    color: "hsl(var(--chart-1))",
  },
  success: {
    label: "Success Rate %",
    color: "hsl(var(--chart-2))",
  },
}

export function CompoundLibraryStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Compound Library Statistics</CardTitle>
        <CardDescription className="text-sm md:text-base">
          Distribution and success rates by therapeutic category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={libraryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} fontSize={10} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
