"use client"

import {Card,CardHeader,CardAction,CardDescription,CardTitle,CardFooter, CardContent} from '@/components/ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Link from 'next/link'
import { useFormRegister } from '@/hooks/forms-actions'
import { Controller } from 'react-hook-form'


export default function FormRegister() {
  const {onSubmit,handleSubmit,control,reset,isLoading} =useFormRegister()
  return (
    <Card className='text-white font-raleway w-1/4 bg-primary border border-border'>
        <CardHeader>
            <CardTitle>Cadastro</CardTitle>
            <CardDescription>Realize o cadastro de sua conta no formulário abaixo</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                <Controller 
                name='name' 
                control={control} 
                rules={{ required: true }} 
                render={({field,fieldState})=>(
                    <div className='flex flex-col gap-6'>
                        <div className='grid gap-2'>
                           <Label>Nome completo</Label>
                           <Input 
                           type="text" 
                           placeholder="Exemplo" {...field} 
                           className={`border ${fieldState.error?'border-red-500':'border-muted-foreground'}`}/>
                        </div> 
                        {fieldState.error && (<p className="text-sm font-medium text-destructive"> {fieldState.error.message}</p>)}
                    </div>
                    )}/> 
                
                <Controller 
                name='email' 
                control={control} 
                rules={{ required: true }} 
                render={({field,fieldState})=>(
                      <div className='grid gap-2'>
                           <Label>Email</Label>
                           <Input 
                           type="email" 
                           placeholder="m@example.com" {...field} 
                           className={`border ${fieldState.error?'border-red-500':'border-muted-foreground'}`}/>
                           {fieldState.error && (<p className="text-sm font-medium text-destructive"> {fieldState.error.message}</p>)}
                      </div>    
                      
                )}/>

                <Controller 
                name='password' 
                control={control} 
                rules={{ required: true }} 
                render={({field,fieldState}) => (
                    <div className='grid gap-2'>
                        <Label>Senha</Label>
                        <Input 
                        type="password" 
                        placeholder="xxxxxxxxx"  {...field} 
                        className={`border ${fieldState.error?'border-red-500':'border-muted-foreground'}`}/>
                        {fieldState.error && (<p className="text-sm font-medium text-destructive"> {fieldState.error.message}</p>)}
                    </div>
                )} />      
                <CardFooter className='flex justify-center text-primary bg-accent-foreground gap-3 flex-col '>
                    <Button type="submit" disabled={isLoading} className='bg-accent border border-muted-foreground text-primary hover:bg-border hover:text-accent cursor-pointer'>Cadastrar-se</Button>
                    <Link href={"/auth/login"} className='text-accent text-sm hover:text-muted-foreground'>Já possui conta!</Link>
                </CardFooter>  
            </form>
        </CardContent>
   
    </Card>
  )
}
