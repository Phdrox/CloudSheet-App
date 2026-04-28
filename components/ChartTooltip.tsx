import { Bar, BarChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

type IChartTooltip={
 configuration:any,
 chartData:any
}

export default function ChartTooltipUI({configuration,chartData}:IChartTooltip) {
  const chartConfig=configuration satisfies ChartConfig
  
  return (
    <Card className="bg-accent-foreground shadow-lg border-2 border-border w-1/2 h-full ">
        <CardHeader>
            <CardTitle className="text-white">Gráfico de Fluxos</CardTitle>
            <CardDescription>Demonstra o controle de fluxo ao longo do ano atual, </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center align-center">
            {chartData.length>0?
            <ChartContainer config={chartConfig} className="w-full ">
                <BarChart accessibilityLayer data={chartData} className="w-full ">
                    <XAxis 
                      dataKey={"date"} 
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value)=>{
                        return (Number(new Date(value).toLocaleDateString("pt-BR",{
                            day:'numeric',                           
                        })) + 1).toString()
                      }}
                    />
                    <Bar
                      dataKey={"ganho"}
                      stackId="a"
                      fill="var(--chart-2)"
                      radius={[ 0, 0,4, 4]}
                        />
                    <Bar
                      dataKey={"gasto"}
                      stackId="a"
                      fill="var(--chart-1)"
                      radius={[ 4, 4,0, 0]}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      cursor={false}
                      defaultIndex={1}
                    />
                </BarChart>
            </ChartContainer>:<CardDescription className="font-bold text-white">Não possui dados</CardDescription>}    
        </CardContent>
    </Card>
  )
}
