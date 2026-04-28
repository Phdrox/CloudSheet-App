import React from 'react'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart'
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from 'recharts'
import { Card, CardHeader } from './ui/card'

interface LineChartDashProps {
   config: ChartConfig
   chartData:any
}

export default function LineChartDash({ config, chartData }: LineChartDashProps) {
  return (
     <Card className='bg-accent-foreground shadow-lg border-2 border-border w-2/3 h-full overflow-x-auto'>
      <CardHeader className='text-white text-xl'>Controle de Saldo Diário</CardHeader>
      {chartData && chartData.length>0?
      <ChartContainer config={config} className="h-full w-full dark p-3 overflow-x-auto">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 20,
              right:25,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => {
                const [,,day] = value.split("-")
                return `${day}`
              }}
            />
            <YAxis
             dataKey="saldo"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value)=>value}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="saldo"
              type="natural"
              stroke="var(--color-saldo)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-saldo)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={8}
                className="fill-foreground"
                fontSize={12}

              />
            </Line>
          </LineChart>
        </ChartContainer>:<p>Não Há Saldo em conta</p>}
      </Card>
  )
}
