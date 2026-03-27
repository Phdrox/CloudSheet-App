"use client"

import CardPrice from "@/components/CardPrice"
import FormFlows from "@/components/FormFlows"
import FormSheet from "@/components/FormSheet"
import { useGetQueries } from "@/hooks/methodsApi"
import { getApi } from "@/hooks/requests/api-request"
import {useDataMe} from "@/hooks/useMe"

export default  function Dashboard() {

  const {data,isLoading} =useGetQueries({
    key:['flows'],
    queryFn:()=> getApi({url:'api/flows/myflows'})
  })
  
  if(isLoading){
    console.log('loading')
  }
  console.log(data)
   
  const cardsData=[
    {
      title:'Ganho',
      price:12,
      color:'text-white',
      bgTitle:'bg-chart-2'
    },
    {
      title:'Gastos',
      price:12,
      color:'text-white',
      bgTitle:'bg-red-500'
    },
    {
      title:'Saldo',
      price:0,
      color:'text-white',
      bgTitle:'bg-muted-foreground'
    },

]



  return (
    <div className="bg-transparent p-10 ">
      <div className="flex flex-col ">
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
      </div>
        
        
    </div>
  )
}
