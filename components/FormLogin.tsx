'use client'
import {Card,CardHeader,CardAction,CardDescription,CardTitle,CardFooter, CardContent} from '@/components/ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Link from 'next/link'
import { useFormLogin } from '@/hooks/forms-actions'
import { Controller } from 'react-hook-form'

export default function FormLogin() {
 
  const {handleSubmit,control,reset,onSubmit} =useFormLogin()

  return (
    <Card className='text-white font-raleway w-1/4 bg-primary border border-border'>
        <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Realize seu login logo abaixo</CardDescription>
        </CardHeader>
        <CardContent>
            <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
                <Controller name='email' control={control} render={({field,fieldState}) => (
                    <div className='grid gap-2'>
                        <Label>Email</Label>
                        <Input type="email" {...field} 
                        placeholder="m@example.com" 
                        
                        className={`border ${fieldState.error?'border-red-500':'border-muted-foreground'}`}/>
                    </div>
                )} />
                
                <Controller
                    name='password' control={control} render={({field,fieldState}) => (
                        <div className='grid gap-2'>
                            <Label>Senha</Label>
                            <Input type="password" 
                            placeholder="xxxxxxxxx" 
                             {...field} 
                            className={`border ${fieldState.error?'border-red-500':'border-muted-foreground'} `}/>
                        </div>
                    ) } 
                />
                <CardFooter className='flex justify-center flex-col text-primary bg-accent-foreground gap-3'>
                    <Button type='submit'  className='bg-accent border border-muted-foreground text-primary hover:bg-border hover:text-accent cursor-pointer w-1/3'>Entrar</Button>
                    <Link href={"/auth/register"} className='text-accent text-sm hover:text-muted-foreground'>Cadastre-se aqui!</Link>
                </CardFooter>        
            </form>
        </CardContent>
        
    </Card>
  )
}
