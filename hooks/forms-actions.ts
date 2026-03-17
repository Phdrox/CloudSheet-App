'use client'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutateAction } from "./methodsApi"
import { postApi } from "./requests/api-request"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

export function useFormRegister() {
  const router=useRouter()
  const schemaFormRegister= z.object({
    name: z.string().min(9,"Preencha o campo nome"),
    email: z.email("Email inválido").min(9,"Preecha o campo email"),
    password: z.string().min(8,"A senha deve ter no mínimo 8 caracteres"),
  })

  type RegisterSchema = z.infer<typeof schemaFormRegister>

  const {handleSubmit, control, reset } = useForm<RegisterSchema>({
    resolver: zodResolver(schemaFormRegister),
    defaultValues:{
        name:'',
        email:'',
        password:'',
    }
  })
  
    const mutation=  useMutateAction({
        key:['user'],
        mutationFn: (data: RegisterSchema) => postApi({url:'api/auth/sign-up/email',data}),
        onSuccess:()=>{router.push('/auth/login')},
        })

  function onSubmit(data:RegisterSchema){
     mutation.mutate(data)
  }

  if(mutation.isError){
    console.log(mutation.error)
  }

  return {onSubmit,reset,handleSubmit,control,isLoading:mutation.isPending}
}


export function useFormLogin() {
 
  const schemaFormLogin = z.object({
    email: z.email(),
    password: z.string(),
  })

  type LoginSchema = z.infer<typeof schemaFormLogin>
  const {handleSubmit, control, reset }= useForm<LoginSchema>({
    resolver: zodResolver(schemaFormLogin),
    defaultValues:{
        email:'',
        password:'',
    }
  })
 

  async function onSubmit(item: LoginSchema) {
    console.log('click')
     const {data,error} = await authClient.signIn.email({
      email: item.email,
      password: item.password,
      rememberMe: true,      
    });

  }


  return {onSubmit,reset,handleSubmit,control}
}