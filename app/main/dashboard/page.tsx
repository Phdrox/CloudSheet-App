"use client"

import CardPrice from "@/components/CardPrice"
import FormFlows from "@/components/FormFlows"
import FormSheet from "@/components/FormSheet"
import { useGetQueries } from "@/hooks/methodsApi"
import { getApi } from "@/hooks/requests/api-request"
import { Toaster } from "@/components/ui/sonner"
import { useMemo, useState } from "react"
import ChartTooltipUI from "@/components/ChartTooltip"
import ChartTooltipPie from "@/components/ChartTooltipPie"
import { useSaldoAcumulado } from "@/hooks/saldoAcumalado"
import { ChartConfig } from "@/components/ui/chart"
import LineChartDash from "@/components/LineChart"
import CardMaxList from "@/components/CardMaxList"
import { Select,SelectContent,SelectGroup,SelectItem,SelectTrigger, SelectValue } from "@/components/ui/select"


export default  function Dashboard() {
  const [date,setDate]=useState<string>('1')
  const {data,isLoading} =useGetQueries({
    key:['flows','deleteflow','historyId',date],
    queryFn:()=> getApi({url:`/flows/myflows?date=${date}`})
  })
  
  const totalSaldo=useGetQueries({
    key:['flows','deleteflow','historyId','totalflows',date],
    queryFn:()=> getApi({url:`/flows/totalflows?date=${date}`})
  })
  
  const{resultadoFinal}:any=useSaldoAcumulado(date)
  
  if(isLoading){
    console.log('loading')
  }
  if(totalSaldo.isLoading){
    console.log('loading')
  }
 
  const saldoTotal=totalSaldo?.data?.data[0]
  const dataFlow=data?.data

  const gastos=saldoTotal?.sumExpense
  const ganhos=saldoTotal?.sumEarn
  const saldo=saldoTotal?.sumTotal

  //Dashboard de histórico por dia
  const chartDataPrice = useMemo(() => {
  if (!dataFlow || !date) return [];

  const grouped = dataFlow.reduce((acc: any, item: any) => {
    const [yearStr, monthStr, dayStr] = item.date.split('T')[0].split('-');

    const day = Number(dayStr) + 1;
 
    if (Number(monthStr) !== Number(date)) return acc;

    const dateKey = `${yearStr}-${monthStr}-${dayStr}`;

    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: dateKey,
        day,
        ganho: 0,
        gasto: 0,
      };
    }

    if (item.type === 'ganho') acc[dateKey].ganho += Number(item.price);
    if (item.type === 'gasto') acc[dateKey].gasto += Number(item.price);

    return acc;
  }, {});

  return Object.values(grouped).sort(
    (a: any, b: any) => a.day - b.day
  );
}, [dataFlow, date]);
 
  console.log(chartDataPrice)
  const months = [
  {label:"Janeiro",value:"1"},
  {label:"Fevereiro",value:"2"},
  {label:"Março",value:"3"},
  {label:"Abril",value:"4"},
  {label:"Maio",value:"5"},
  {label:"Junho",value:"6"},
  {label:"Julho",value:"7"},
  {label:"Agosto",value:"8"},
  {label:"Setembro",value:"9"},
  {label:"Outubro",value:"10"},
  {label:"Novembro",value:"11"},
  {label:"Dezembro",value:"12"},
];
 
// Dashboard de categoria
  const chartDataCategory=useMemo(()=>{
    if(!dataFlow || dataFlow.length ===0 || gastos === 0) return [];
    
    const grouped=dataFlow.reduce((acc:any,item:any) => {
      if (item.type !== 'gasto') return acc;
      const [_, monthStr] = item.date.split('T')[0].split('-');
      if (Number(monthStr) !== Number(date)) return acc;      
      
      const categories=item.id_categories
      if(!acc[categories]){
        acc[categories]={category:categories,gasto:0}
       }

       acc[categories].gasto += ((Number(item.price || 0)/gastos)*100);
       
       return acc;
    },{})
   
    return Object.values(grouped).map((item: any,index:any) => ({
      ...item,
      gasto: Number(item.gasto.toFixed(2)),
      fill: `var(--chart-${(index % 5) + 1})`
    })).sort((a:any,b:any) => 
    b.gasto - a.gasto);
  },[date,gastos,dataFlow])

  const configChart={
    ganho:{
      label:"ganho",
      color:"var(--chart-1)"
    },
    gastos:{
      label:"gasto",
      color:"var(--chart-2)"
    }
  }
    
  const cardsData=[
    {
      title:'Ganhos',
      price:ganhos,
      color:'text-white',
      bgTitle:'bg-chart-2'
    },
    {
      title:'Gastos',
      price:gastos,
      color:'text-white',
      bgTitle:'bg-red-500'
    },
    {
      title:'Saldo',
      price:saldo,
      color:'text-white',
      bgTitle:'bg-muted-foreground'
    },
]

const chartLine = {
  saldo: {
    label: "Saldo",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

  return (
    <div className="bg-transparent p-10 ">
      <div className="flex flex-col">
        <div className="w-full flex justify-center text-2xl text-white ">
            Dashboard
          </div> 
          <Toaster/>
          <div className="flex justify-end pb-6  gap-5">
              <Select value={date} onValueChange={setDate}  >
                <SelectTrigger className="text-white w-1/10 data-[placeholder]:text-white">
                  <SelectValue placeholder="Janeiro"  />
                </SelectTrigger>
                <SelectContent className="dark" >
                  <SelectGroup >
                  {months.map((item:any,index:number)=>(
                    <SelectItem key={index} value={item.value} >{item.label}</SelectItem>
                  ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormSheet title="Criar" description="Preencha os dados para criar um fluxo" buttonSheetName="Criar Fluxo" children={
              <FormFlows/>
              } />
          </div>
          <div className="flex gap-24 justify-center">
          {
            cardsData?.map((i,index) =>(
              <CardPrice key={index} price={i.price} title={i.title} color={i.color} bgTitle={i.bgTitle}/>
            ))
          }
          </div>
          <div className="w-full pt-2 flex flex-col gap-5">
            <div className="flex w-full pt-2 gap-5 justify-around">
              <ChartTooltipUI chartData={chartDataPrice} configuration={configChart}/>
              <ChartTooltipPie chartData={chartDataCategory} />
            </div>
            <div className="w-full flex  h-full gap-3">
                <LineChartDash config={chartLine} chartData={resultadoFinal?resultadoFinal:[]}/>
                <CardMaxList data={dataFlow} date={date}/>
            </div>
            
          </div>   
      </div>       
    </div>
  )
}
