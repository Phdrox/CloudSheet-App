
import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

type IChartToolPie={
    chartData:any
}

export default function ChartTooltipPie({chartData}:IChartToolPie) {
    const configChart={
    category:{
      label:"category",
      color:"var(--chart-1)"
    },
    gasto:{
      label:"gasto",
      color:"var(--chart-2)"
    }
  }
  
  return (
    <Card className="flex flex-col w-1/2 bg-foreground text-white border-2 border-border shadow-lg">
      <CardHeader className="items-center pb-0">
        <CardTitle>Percentual de gastos</CardTitle>
        <CardDescription>Mostra o percentual de gastos por categoria</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 justify-center ">
        {chartData.length>0?<ChartContainer
          config={configChart}
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="gasto"
              nameKey="category"
              stroke="0"
              label
            />
          </PieChart>
        </ChartContainer>:<CardDescription className="">Não possui dados</CardDescription>}
      </CardContent>
    </Card>
  )
}
