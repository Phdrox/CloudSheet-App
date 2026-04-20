
import { Controller } from 'react-hook-form'
import { Button } from './ui/button'
import { Field, FieldGroup, FieldLabel } from './ui/field'
import { Input } from './ui/input'
import { useFormGoal } from '@/hooks/forms-actions'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from './ui/input-group'
export default function FormGoal() {
 
const {handleSubmit,reset,control,onSubmit}=useFormGoal()

  return (
    <form id='form-goals' onSubmit={handleSubmit(onSubmit,(errors) => console.log("Erros do Zod:", errors))} className='flex flex-col gap-4'>
         <FieldGroup className="text-white p-3">
           <Controller name='name' control={control} render={({field,fieldState})=>(
            <Field className='w-full'>
              <FieldLabel>Nome da meta</FieldLabel>
            <Input {...field} type='text' placeholder='Insira o nome da meta' aria-invalid={fieldState.invalid}/>
            </Field>
           )}/>
           <Controller name='value' control={control} render={({field,fieldState})=>(
              <Field className='w-full'>
                    <FieldLabel>Valor que você precisa para cumprir a meta</FieldLabel>
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
           <Controller name='have' control={control} render={({field,fieldState})=>(
              <Field className='w-full'>
                    <FieldLabel>Valor que você tem para meta</FieldLabel>
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
        <Button type='submit' form="form-goals" className='cursor-pointer hover:bg-accent hover:text-white dura tion-300 p-4'>Cadastrar</Button>
    </form>
  )
}
