'use client'
import FormLogin from '@/components/FormLogin'
import { getApi } from '@/hooks/requests/api-request'
import Image from 'next/image'
import { useEffect } from 'react'

export default function Login() {


  useEffect( () => {
    async function fetch(){
      try {
        const {data}= await getApi({url:'api/category'})
        console.log(data)
      } catch (e) {
        console.log("Erro ao buscar API:", e)
      }
    }

    fetch()
},[])

  return (
    <div className='min-h-screen bg-foreground  gap-3 flex items-center justify-center flex-col'>
      <Image src={'/LogoCloud.png'} height={150} width={150} alt='logosheetcloud'/>
      <FormLogin/>
    </div>
  )
}
