'use client'
import { FieldGroup, FieldLabel,Field, FieldDescription } from './ui/field'
import { useFormFlows } from '@/hooks/forms-actions'
import { Controller } from 'react-hook-form'
import { useGetQueries } from '@/hooks/methodsApi'
import { getApi } from '@/hooks/requests/api-request'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { Input} from './ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from './ui/input-group'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react'
import { ptBR } from "date-fns/locale"
import {format} from "date-fns"
import { Calendar } from './ui/calendar'
import { Combobox,ComboboxInput,ComboboxContent,ComboboxEmpty,ComboboxList,ComboboxItem } from './ui/combobox'
import { Command, CommandInput, CommandItem, CommandList } from './ui/command'
import { cn } from '@/lib/utils'


 type IFlows={
    type_categorie:string;
    id:number;
    submitButton:()=>void
 }

export default function FormFlows() {

 const {handleSubmit,control,reset,onSubmit}=useFormFlows()
 const {data,isLoading}=useGetQueries({key:['category'],queryFn:()=>getApi({url:'/category'})})
 const items=data?.data || [];
 const banks=useGetQueries({key:['banks'],queryFn:()=>getApi({url:`/banks`})})
 const itemsBank=banks?.data?.data || [];

  return (
    <form id="form-flows" className='flex flex-col justify-around gap-10'  onSubmit={handleSubmit(onSubmit,(errors) => console.log("Erros do Zod:", errors))}>
        <FieldGroup className="text-white">
            <Controller name='name' control={control} render={({field,fieldState})=>(
                <Field>
                    <FieldLabel>Nome do Fluxo</FieldLabel>
                    <Input    
                          
                        {...field}
                        type='text' 
                        aria-invalid={fieldState.invalid} 
                        placeholder='Insira o nome do fluxo' 
                        autoComplete='true'  />
                </Field>                
            )}/>
            
            <Controller name='id_categories'control={control} render={({field,fieldState})=>(
               <Field>
                  <FieldLabel>
                      Categoria
                  </FieldLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value} 
                    value={field.value}
                    aria-invalid={fieldState.invalid}
                    
                    >
                      <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria"/>
                      </SelectTrigger>
                      <SelectContent className='dark'>
                        <SelectGroup>
                          <SelectLabel>Categorias</SelectLabel>
                            {isLoading?<></>:items.map((category:IFlows)=>(
                                <SelectItem key={category.id} value={category.type_categorie}>{category.type_categorie}</SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                  </Select>
               </Field>
            )} /> 
            
            <Controller name='id_name_banks'control={control} render={({field,fieldState})=>(
               <Field>
                  <FieldLabel>
                      Instituição Financeira
                  </FieldLabel>
                  <FieldDescription>Use a seta do teclado pra cima ou pra baixo para navegar na lista</FieldDescription>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn("w-[200px] justify-between  truncate", !field.value && "text-muted-foreground ")}
                      >
                        {field.value
                          ? itemsBank.find((f:any) => f.id === field.value)?.name
                          : "Selecione uma Instituição"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-86 p-0 ">
                      <Command>
                        <CommandInput placeholder="Selecione uma Instituição" />
                        <CommandList>
                          {itemsBank.map((framework:any) => (
                            <CommandItem
                              value={framework.name}
                              key={framework.id}
                              onSelect={() => {
                                field.onChange(framework.id) // <--- ATUALIZA O REACT HOOK FORM
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
               <Field>
                  <FieldLabel>
                      Tipo de Fluxo
                  </FieldLabel>
                  <Select 
                    
                    onValueChange={field.onChange} 
                    defaultValue={field.value} 
                    value={field.value}
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
            <FieldGroup className='flex flex-row align-center justify-center'>
            <Controller name='payment'control={control} render={({field,fieldState})=>(
               <Field className='w-1/2'>
                  <FieldLabel>
                      Forma de Pagamento
                  </FieldLabel>
                  <Select 
                    
                    onValueChange={field.onChange} 
                    defaultValue={field.value} 
                    value={field.value}
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
                     <InputGroup>
                        <InputGroupAddon>
                        <InputGroupText>R$</InputGroupText>
                        </InputGroupAddon>
                        <InputGroupInput 
                             
                            {...field} 
                            placeholder='Insira o valor' 
                            type='text' 
                            autoComplete='true' 
                            aria-invalid={fieldState.invalid} />
                        <InputGroupAddon align="inline-end">
                        <InputGroupText>BRL</InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                </Field>                
            )}/>
        </FieldGroup>
            <Controller name='date' control={control} render={({field,fieldState})=>(
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
                            <Calendar mode='single' selected={field.value} onSelect={field.onChange} required />
                        </PopoverContent>
                    </Popover>            
                </Field>
            )}/>
            
        </FieldGroup>
        <Button type='submit' form="form-flows" className='cursor-pointer hover:bg-accent hover:text-white duration-300 p-6'>Enviar</Button>
    </form>
  )
}
