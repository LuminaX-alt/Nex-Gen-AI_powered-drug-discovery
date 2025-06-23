"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const propertyData = [
  { month: "Jan", solubility: 65, toxicity: 23, bioavailability: 78 },
  { month: "Feb", solubility: 72, toxicity: 19, bioavailability: 82 },
  { month: "Mar", solubility: 68, toxicity: 25, bioavailability: 75 },
  { month: "Apr", solubility: 75, toxicity: 18, bioavailability: 85 },
  { month: "May", solubility: 79, toxicity: 16, bioavailability: 88 },
  { month: "Jun", solubility: 82, toxicity: 14, bioavailability: 91 },
]

const chartConfig = {
  solubility: {
    label: "Solubility Score",
    color: "hsl(var(--chart-1))",
  },
  toxicity: {
    label: "Toxicity Risk",
    color: "hsl(var(--chart-2))",
  },
  bioavailability: {
    label: "Bioavailability",
    color: "hsl(var(--chart-3))",
  },
}

export function MolecularPropertyChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Prediction Trends</CardTitle>
        <CardDescription>Monthly average scores for key molecular properties</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={propertyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="solubility"
                stroke="var(--color-solubility)"
                strokeWidth={2}
                dot={{ fill: "var(--color-solubility)" }}
              />
              <Line
                type="monotone"
                dataKey="toxicity"
                stroke="var(--color-toxicity)"
                strokeWidth={2}
                dot={{ fill: "var(--color-toxicity)" }}
              />
              <Line
                type="monotone"
                dataKey="bioavailability"
                stroke="var(--color-bioavailability)"
                strokeWidth={2}
                dot={{ fill: "var(--color-bioavailability)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
