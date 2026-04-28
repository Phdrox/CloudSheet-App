import { CircleDollarSign, LoaderCircleIcon } from "lucide-react"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "./ui/item";
import { Separator } from "./ui/separator";

type IFlowCard={
    name:string;
    price:string;
}

interface IMaxList{
  data?:{}[]
  date:string
}

export default function CardMaxList({data,date}:IMaxList) {
  const gastos:any=data?.filter((item:any)=> item.type==='gasto' && Number(new Date(item.date).getMonth()+1) == Number(date))?.slice(0,10) || []

  
  const listMaxExpensive = [...gastos].sort(
    (a: any, b: any) => Number(b.price) - Number(a.price)
  );
  
  const formart=(value:number)=>{
    const formartValues=new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits:2,
    }).format(value);
  return formartValues;
  }
  
   
  return (
     <Card className="dark  shadow-lg border-2 border-border w-1/3 h-full">
        <CardHeader className="text-lg text-center">Maiores gastos deste mês</CardHeader>
        {listMaxExpensive.length>0?listMaxExpensive?.map((item:any,index:number)=>(
            <Item key={index} className="flex gap-2">
                <ItemActions>
                    <CircleDollarSign className="text-chart-2" />
                </ItemActions>
                <ItemContent>
                    <ItemTitle>{item.name}</ItemTitle>
                    <ItemDescription className="text-chart-5">
                     {formart(item.price)}
                    </ItemDescription>
                </ItemContent>     
                <Separator/>       
            </Item>
            
        )):<p className="text-center font-bold">Não possui gastos esse mês</p>}
     </Card>
  )
}
