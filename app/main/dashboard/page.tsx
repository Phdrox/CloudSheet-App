"use client"

import CardPrice from "@/components/CardPrice"
import FormFlows from "@/components/FormFlows"
import FormSheet from "@/components/FormSheet"
import { useGetQueries } from "@/hooks/methodsApi"
import { getApi } from "@/hooks/requests/api-request"
import { Toaster } from "@/components/ui/sonner"
import { useMemo } from "react"
import ChartTooltipUI from "@/components/ChartTooltip"
import ChartTooltipPie from "@/components/ChartTooltipPie"

export default  function Dashboard() {

  const {data,isLoading} =useGetQueries({
    key:['flows','deleteflow','historyId'],
    queryFn:()=> getApi({url:'/flows/myflows'})
  })
  
 
  function SomarPrice(array:any[],type:string){
    if (!array || !Array.isArray(array)) return 0;
    
    const arrayPrice=array.filter((i:{type:string})=>i.type==type)
    const prices=arrayPrice.map((i:any)=>Number(i.price))
    const result=prices.reduce((arr:any,i:any) => arr + i ,0)
    return result
  }

  if(isLoading){
    console.log('loading')
  }

  const dataFlow=data?.data

  const gastos=SomarPrice(dataFlow,'gasto')
  const ganhos=SomarPrice(dataFlow,'ganho')
  const saldo=ganhos-gastos
  
  const chartDataPrice=useMemo(()=>{
    if(!dataFlow) return [];
    
    const grouped=dataFlow.reduce((acc:any,item:any) => {
     const date = item.date.split('T')[0].split('-'); 
     const year = parseInt(date[0]);
     const month = parseInt(date[1]);
       const dateKey=`${year}-${month}`;
       
       if(year !== new Date().getFullYear()) return acc
       
      if(!acc[dateKey]){
        const formatDate = new Date(year, month - 1, 1);
        acc[dateKey]={date:dateKey,formattedDate:formatDate,ganho:0,gasto:0}
       }

       if(item.type ==='ganho') acc[dateKey].ganho += Number(item.price);
       if(item.type ==='gasto') acc[dateKey].gasto += Number(item.price);
       return acc;
    },{})
   return Object.values(grouped).sort((a:any,b:any) => 
    new Date(a.date).getTime()- new Date(b.date).getTime());
  },[data])
 
  //constante de categoria
    const chartDataCategory=useMemo(()=>{
    if(!dataFlow || dataFlow.length ===0 || gastos === 0) return [];
    
    const grouped=dataFlow.reduce((acc:any,item:any) => {
      if (item.type !== 'gasto') return acc;
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
  },[dataFlow,gastos])

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



  return (
    <div className="bg-transparent p-10 ">
      <div className="flex flex-col">
        <div className="w-full flex justify-center text-2xl text-white ">
            Dashboard
          </div>
          
          <Toaster/>
          <div className="flex justify-end pb-6 ">
              <FormSheet title="Criar" description="Preencha os dados para criar um fluxo" buttonSheetName="Criar Fluxo" children={
              <FormFlows/>
              } />
          </div>
          <div className="flex gap-24 justify-center">
          {
            cardsData.map((i,index) =>(
              <CardPrice key={index} price={i.price} title={i.title} color={i.color} bgTitle={i.bgTitle}/>
            ))
          }
          </div>
          <div className="w-full pt-2 flex gap-5 justify-around">
            <ChartTooltipUI chartData={chartDataPrice} configuration={configChart}/>
            <ChartTooltipPie chartData={chartDataCategory} />
          </div>
          
      </div>       
    </div>
  )
}
