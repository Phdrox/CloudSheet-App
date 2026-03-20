'use client'
import FormLogin from '@/components/FormLogin'
import { getApi } from '@/hooks/requests/api-request'
import Image from 'next/image'

export default async function Login() {
 try {
    
    
  } catch (e) {
    console.log("Erro ao buscar API:", e)
  }

  return (
    <div className='min-h-screen bg-foreground  gap-3 flex items-center justify-center flex-col'>
      <Image src={'/LogoCloud.png'} height={150} width={150} alt='logosheetcloud'/>
      <FormLogin/>
    </div>
  )
}
