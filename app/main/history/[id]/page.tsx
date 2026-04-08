'use client'

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetQueries } from "@/hooks/methodsApi"
import { getApi } from "@/hooks/requests/api-request"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { use } from "react"
import { CalendarIcon, Check, ChevronsUpDown, LoaderCircle } from "lucide-react"
import { Controller} from "react-hook-form"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { PopoverContent, PopoverTrigger,Popover } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CommandInput, CommandItem, CommandList,Command } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { useDeleteFlow, useFormFlowsEdit } from "@/hooks/forms-actions"
import { ptBR } from "date-fns/locale"
import {format} from "date-fns"
import { cn } from '@/lib/utils'

 type IFlows={
    type_categorie:string;
    id:number;
    submitButton:()=>void
 }

export default function HistoryDetails({params,}:{params:Promise<{id:string}>}) {

  const {id} =use(params)
  
  const {data,isLoading}=useGetQueries(
    {key:['historyId','flows',id],
    queryFn:()=>getApi({url:`/flows/${id}`})
  })
  const detailsId=data?.data?.[0]
 
  const banks=useGetQueries({key:['banks'],queryFn:()=>getApi({url:`/banks`})})
  const itemsBank=banks?.data?.data || [];

  const {handleSubmit,control,reset,onSubmit}=useFormFlowsEdit(id,detailsId)
  const deleteFlow=useDeleteFlow()
  
  const category=useGetQueries({key:['category'],queryFn:()=>getApi({url:'/category'})})
  const itemsCategory=category?.data?.data || []
  
  if (isLoading || !detailsId) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoaderCircle className="animate-spin text-white" />
        <p className="ml-2 text-white">Carregando dados do fluxo...</p>
      </div>
    );
  }



  return (
    <div className="p-10 flex flex-col gap-4 ">
        <Link href={'/main/history'}>
            <Button variant="outline">Voltar</Button>
        </Link>
        <div>
            <p className="text-white text-3xl flex items-center gap-3 ">
                {detailsId.name}
                <Badge 
                    className={`${detailsId.type==='gasto'?'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300':'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300'} `}>
                    {detailsId.type}
                </Badge> 
            </p>
        </div>
        <div className="flex justify-between">
           <Card className="text-white  p-1 w-1/6 dark shadow-lg text-center text-lg">{new Date(detailsId.date).toLocaleDateString('pt-BR')}</Card> 
           <Button className="bg-red-500 p-4 cursor-pointer" onClick={()=>deleteFlow.onSubmit(id)} >
            {deleteFlow.isDeleting ? 'Deletando...' : 'Deletar'}
           </Button>
        </div>

        <div >
            <Card className="dark shadow-xl w-7/8">
                <CardHeader>
                    <CardTitle>Formulário de Edição</CardTitle>
                    <CardDescription>Formulário para edição do fluxo</CardDescription>
                    <form onSubmit={handleSubmit(onSubmit)} id="form-flows-edit" className="flex flex-col gap-1" >
                       <FieldGroup>
                          <Controller name='name' control={control} render={({field,fieldState})=>(
                               <Field>
                                   <FieldLabel>Nome do Fluxo</FieldLabel>
                                   <Input    
                                       {...field}
                                       type='text' 
                                       aria-invalid={fieldState.invalid} 
                                       placeholder='Insira o nome do fluxo' 
                                       autoComplete='true' 
                                       value={field.value?? ''}
                                   />

                               </Field>                
                           )}/>
            
                            <Controller name='id_categories'control={control} render={({field,fieldState})=>(
                               <Field>
                                  <FieldLabel>
                                      Categoria
                                  </FieldLabel>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    value={field.value || detailsId.id_categories}
                                    aria-invalid={fieldState.invalid}
                                    >
                                      <SelectTrigger>
                                          <SelectValue placeholder="Selecione uma categoria"  />
                                      </SelectTrigger>
                                      <SelectContent className='dark'>
                                        <SelectGroup>
                                          <SelectLabel>Categorias</SelectLabel>
                                            {category?.isLoading?<></>:itemsCategory.map((category:IFlows)=>(
                                                <SelectItem key={category.id} value={category.type_categorie}>{category.type_categorie}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                      </SelectContent>
                                  </Select>
                               </Field>
                            )} /> 
                         
                          <FieldGroup className="flex flex-row items-center justify-center">
                           <Controller name='id_name_banks'control={control} render={({field,fieldState})=>(
                               <Field className="w-1/2">
                                  <FieldLabel className="flex">
                                      Instituição Financeira
                                       <FieldDescription>(Use a seta do teclado pra cima ou pra baixo)</FieldDescription>
                                  </FieldLabel>
                                 
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn("w-[200px] justify-between  truncate", !field.value && "text-muted-foreground ")}
                                      >
                                        {field.value
                                          ? itemsBank.find((f:any) => f.id ===field.value)?.name
                                          : field.value}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full h-68 p-0 ">
                                      <Command>
                                        <CommandInput placeholder="Selecione uma Instituição" />
                                        <CommandList>
                                          {itemsBank.map((framework:any) => (
                                            <CommandItem
                                              value={framework.name}
                                              key={framework.id}
                                              onSelect={() => {
                                                field.onChange(framework.id) 
                                              }}
                                            >
                                              <Check
                                                className={cn(
                                                  "mr-2 h-4 w-4",
                                                  framework.id === field.value ? "opacity-100" : "opacity-0"
                                                )}
                                              />
                                              {framework.name}
                                            </CommandItem>
                                          ))}
                                        </CommandList>
                                      </Command>
                                    </PopoverContent>
                                  </Popover>
                               </Field>
                            )} /> 
          

                            <Controller name='type'control={control} render={({field,fieldState})=>(
                               <Field className="w-1/2">
                                  <FieldLabel>
                                      Tipo de Fluxo
                                  </FieldLabel>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    value={field.value || detailsId.type}
                                    aria-invalid={fieldState.invalid}>
                                      <SelectTrigger>
                                          <SelectValue placeholder="Selecione o tipo de fluxo"/>
                                      </SelectTrigger>
                                      <SelectContent className='dark'>
                                        <SelectGroup>
                                          <SelectLabel>Tipo de Fluxo</SelectLabel>
                                            <SelectItem value='gasto'>Gasto</SelectItem>
                                            <SelectItem value='ganho'>Ganho</SelectItem>
                                        </SelectGroup>
                                      </SelectContent>
                                  </Select>
                               </Field>
                            )} /> 
                          </FieldGroup>
            
                          <FieldGroup className='flex flex-row align-center justify-center'>
                              <Controller name='payment'control={control} render={({field,fieldState})=>(
                                 <Field className='w-1/2'>
                                    <FieldLabel>
                                        Forma de Pagamento
                                    </FieldLabel>
                                    <Select 
                                      onValueChange={field.onChange} 
                                      value={field.value || detailsId.payment}
                                      aria-invalid={fieldState.invalid} >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione uma forma de pagamento"/>
                                        </SelectTrigger>
                                        <SelectContent className='dark'>
                                          <SelectGroup>
                                            <SelectLabel>Forma de Pagamento</SelectLabel>
                                               <SelectItem  value='pix'>Pix</SelectItem>
                                               <SelectItem  value='credito'>Crédito</SelectItem>
                                               <SelectItem  value='debito'>Débito</SelectItem>
                                               <SelectItem  value='boleto'>Boleto</SelectItem>                           
                                          </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                 </Field>
                              )} /> 

                              <Controller name='price' control={control} render={({field,fieldState})=>(
                                <Field className='w-1/2'>
                                    <FieldLabel>Valor</FieldLabel>
                                     <InputGroup >
                                        <InputGroupAddon>
                                        <InputGroupText>R$</InputGroupText>
                                        </InputGroupAddon>
                                        <InputGroupInput 

                                            {...field} 
                                            placeholder='Insira o valor' 
                                            type='text' 
                                            autoComplete='true' 
                                            aria-invalid={fieldState.invalid}
                                            value={field.value ?? ''}
                                            />

                                        <InputGroupAddon align="inline-end">
                                        <InputGroupText>BRL</InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Field>                
                              )}/>
                          </FieldGroup>
                          
                          <Controller name='date'  control={control} render={({field,fieldState})=>(
                              <Field>
                                  <FieldLabel>Data</FieldLabel>
                                  <Popover>
                                      <PopoverTrigger asChild>
                                          <Button variant='outline' data-empty={!field.value}>
                                              <CalendarIcon/>
                                              {field.value ? format(field.value, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                                          </Button>
                                      </PopoverTrigger>
                                      <PopoverContent>
                                          <Calendar mode='single' selected={field.value} onSelect={field.onChange}  required />
                                      </PopoverContent>
                                  </Popover>            
                              </Field>
                          )}/>
                       </FieldGroup>
                       <div className="w-full flex justify-center">
                       <Button type='submit' form="form-flows-edit" 
                       className=' mt-2 w-1/4 text-cursor-pointer hover:bg-accent hover:text-whiter text-black duration-300 p-5 cursor-pointer '
                        >Editar</Button>
                       </div>
                    </form>
                </CardHeader>
            </Card>
        </div>


    </div>
  )
}
