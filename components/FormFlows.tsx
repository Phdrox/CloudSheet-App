import React from 'react'
import { FieldGroup, FieldLabel,Field } from './ui/field'
import { useFormFlows } from '@/hooks/forms-actions'
import { Controller } from 'react-hook-form'
import { useGetQueries } from '@/hooks/methodsApi'
import { getApi } from '@/hooks/requests/api-request'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { Input} from './ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from './ui/input-group'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { CalendarIcon } from 'lucide-react'
import { ptBR } from "date-fns/locale"
import {format} from "date-fns"
import { Calendar } from './ui/calendar'

 type IFlows={
    type_categorie:string;
    id:number;
    submitButton:()=>void
 }

export default function FormFlows() {

 const {handleSubmit,control,reset,onSubmit}=useFormFlows()
 const {data,isLoading}=useGetQueries({key:['category'],queryFn:()=>getApi({url:'api/category'})})
 const items=data?.data || [];
  return (
    <form id="form-flows"  onSubmit={handleSubmit(onSubmit,(errors) => console.log("Erros do Zod:", errors))}>
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

            <Controller name='payment'control={control} render={({field,fieldState})=>(
               <Field>
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
                <Field>
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
            <Button type='submit' form="form-flows" className='cursor-pointer hover:bg-accent hover:text-white duration-300'>Enviar</Button>
        </FieldGroup>
    </form>
  )
}
