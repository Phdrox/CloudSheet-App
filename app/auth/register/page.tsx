
import FormRegister from '@/components/FormRegister'
import { Toaster } from 'sonner'

export default function Resgister() {
  return (
    <div className='min-h-screen bg-foreground flex items-center justify-center'>
      <Toaster/>
      <FormRegister/>
    </div>
  )
}
