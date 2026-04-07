'use client'
import DataTableFlow from '@/components/DataTableFlow'
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { useGetQueries } from '@/hooks/methodsApi';
import { getApi } from '@/hooks/requests/api-request'
import { ColumnDef } from '@tanstack/react-table';
import { InfoIcon, Menu, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type IFlows ={
  id:string;
  name:string;
  type:string;
  payment:string;
  id_categories:string;
  price:string;
  date:Date|any;
}


export default function History() {

  const [flowName,setFlowName]=useState('')
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setFlowName(value);
  }, 200);


  const {data,isLoading} =useGetQueries({
      key:['flows',flowName],
      queryFn:()=> getApi({url:`/flows/allflows?search=${flowName}`}),
    
    })
  
    if(isLoading){
      console.log('loading')
    }
  

  const columns:ColumnDef<IFlows>[]=[
    {
      accessorKey:"id",
      header:()=><div className='hidden'></div>,
      cell:({row})=>{
        return null
      }

    },
    {
      accessorKey:"name",
      header:"Nome",
      cell:({row})=>{
        const name:any=row.getValue('name')
        return <div className='max-w-[150px] truncate whitespace-nowrap'>{name}</div>
      }
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
      accessorKey:"bank",
      header:"Instituição Financeira",
      cell:({row})=>{
        const bank: string = row.getValue('bank')
      return (
        // Adicionei 'block' para o truncate funcionar corretamente
        <div className='max-w-[150px] truncate font-medium' title={bank}>
          {bank}
        </div>
      )
      }
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
        return <div className={`${color}`}>{type=='gasto'?`-${formatted}`:formatted}</div>
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
      header:"Action",
      cell:({row})=>{
        const id=row.getValue('id')
        return <Link href={`/main/history/${id}`}><Menu/></Link>
      }
    }
  ]

  const dataFlow=data?data.data:[]
  
  return (
    <div className='p-10'>
      <div className='w-full text-2xl text-white flex justify-center'>Histórico</div>
      <div >
        <div className='w-full flex my-3 '> 
          <InputGroup className='dark text-ring w-1/3'>
            <InputGroupInput placeholder='Pesquise pelo nome do fluxo' onChange={(e)=>debouncedSearch (e.target.value)} />
            <InputGroupAddon align='inline-end'>
             <Search/>
            </InputGroupAddon>
          </InputGroup>

        </div>
        <DataTableFlow data={dataFlow} columns={columns} isLoading={isLoading}/>
      </div>
     
    </div>
  )
}
