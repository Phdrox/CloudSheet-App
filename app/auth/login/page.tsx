'use client'
import FormLogin from '@/components/FormLogin'
import Image from 'next/image'

export default function Login() {
  return (
    <div className='min-h-screen bg-foreground  flex items-center justify-center flex-col'>
      <Image src={'/LogoCloud.png'} height={200} width={200} alt='logosheetcloud'/>
      <FormLogin/>
    </div>
  )
}
