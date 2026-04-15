
import { Controller } from 'react-hook-form'
import { Button } from './ui/button'
import { Field, FieldGroup, FieldLabel } from './ui/field'
import { Input } from './ui/input'
import { useFormGoal } from '@/hooks/forms-actions'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from './ui/input-group'

export default function FormGoal() {
 
const {handleSubmit,reset,control,onSubmit}=useFormGoal()



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
         <FieldGroup className="text-white">
           <Controller name='name' control={control} render={()=>(
            <Input type='text'/>
           )}/>
           <Controller name='value' control={control} render={({field,fieldState})=>(
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
           <Controller name='have' control={control} render={({field,fieldState})=>(
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
        <Button type='submit' form="form-flows" className='cursor-pointer hover:bg-accent hover:text-white dura tion-300 p-6'>Cadastrar</Button>
    </form>
  )
}
