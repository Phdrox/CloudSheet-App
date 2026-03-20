import FormLogin from '@/components/FormLogin'
import { getApi } from '@/hooks/requests/api-request'
import Image from 'next/image'

export default async function Login() {
  const {data}= await getApi({url:'/api/category'})

  console.log(data)


  return (
    <div className='min-h-screen bg-foreground  gap-3 flex items-center justify-center flex-col'>
      <Image src={'/LogoCloud.png'} height={150} width={150} alt='logosheetcloud'/>
      <FormLogin/>
    </div>
  )
}
