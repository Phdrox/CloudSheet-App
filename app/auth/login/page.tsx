'use client'
import FormLogin from '@/components/FormLogin'
import Image from 'next/image'


export default function Login() {

  return (
    <div className='min-h-screen bg-foreground  gap-3 flex items-center justify-center flex-col'>
      <Image src={'/LogoCloud.png'} height={150} width={150} alt='logosheetcloud'/>
      <FormLogin/>
    </div>
  )
}
