'use client'
import DataTableFlow from '@/components/DataTableFlow'
import { useGetQueries } from '@/hooks/methodsApi';
import { getApi } from '@/hooks/requests/api-request'
import { ColumnDef } from '@tanstack/react-table';

type IFlows ={
  name:string;
  type:string;
  payment:string;
  id_categories:string;
  price:string;
  date:Date|any;
}


export default function History() {

  const {data,isLoading} =useGetQueries({
      key:['allflows'],
      queryFn:()=> getApi({url:'/flows/allflows'})
    })
  
    if(isLoading){
      console.log('loading')
    }
   console.log(data)

  const columns:ColumnDef<IFlows>[]=[
    {
      accessorKey:"name",
      header:"Nome",
    },
    {
      accessorKey:"type",
      header:"Tipo",
      cell:({row})=>{
        const text:any=row.getValue('type')
        const formatText=text.charAt(0).toUpperCase() + text.slice(1)
        return formatText
      }
    },
    {
      accessorKey:"payment",
      header:"Pagamento",
      cell:({row})=>{
        const text:any=row.getValue('payment')
        const formatText=text.charAt(0).toUpperCase() + text.slice(1)
        return formatText
      }
    },
    {
      accessorKey:"id_categories",
      header:"Categoria",
    },
    {
      accessorKey:"price",
      header:"Preço",
      cell:({row})=>{
        const amount = parseFloat(row.getValue("price"))
        const type=row.getValue('type')
        const color=type=='gasto'?'text-red-500':'text-green-500'
        const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        }).format(amount)
        return <div className={`${color}`}>{formatted}</div>
      }
    }, {
      accessorKey:"date",
      header:"Data",
      cell:({row})=>{
        const date=new Date(row.getValue('date'))
        return date.toLocaleDateString('pt-BR')
      }
    },
    {
      accessorKey:"actions",
      header:"Action"
    }
  ]

  if(isLoading){
    console.log('carregando')
  }
  console.log(data)
  
  return (
    <div>
     
    </div>
  )
}
