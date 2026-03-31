'use client'
import {  z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutateAction } from "./methodsApi"
import {  postApi } from "./requests/api-request"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"
import { useDataMe } from "./useMe"


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
        mutationFn: (data: RegisterSchema) => postApi({url:'/auth/register',data}),
        onSuccess:()=>{
          toast.success('Fluxo criado com sucesso',{position:'top-center'})
          router.push('/auth/login')
        },
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
  const router=useRouter()
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
  
  const mutation=useMutateAction({
        key:['login'],
        mutationFn: (data: LoginSchema) => postApi({url:'/auth/login',data}),
        onSuccess:()=>{router.push('/main/dashboard')},
  })

  async function onSubmit(item: LoginSchema) {
    mutation.mutate(item)
  }


  return {onSubmit,reset,handleSubmit,control}
}

export function useFormFlows(){
   const item=useDataMe()

  const schemaFormFlows=z.object({
    id_categories: z.string().min(1, "Selecione uma categoria"),
    id_account: z.string(),
    id_name_banks:z.string().min(1,"Deve ter pelo menos um banco"),
    name: z.string().min(1, "Deve ter no mínimo 5 caracteres"),
    type: z.string().min(1, "Selecione o tipo"),
    payment: z.string().min(1, "Selecione o pagamento"),
    price: z.string()
      .refine((val) => !isNaN(Number(val.replace(',', '.'))), "Valor inválido")
      .refine((val) => Number(val.replace(',', '.')) > 0, "O valor deve ser maior que zero"),
    date: z.date()
  })

  type FlowsSchema=z.infer<typeof schemaFormFlows>
  const {handleSubmit,control, reset}=useForm<FlowsSchema>({
      resolver:zodResolver(schemaFormFlows),
      defaultValues:{
        id_categories:'',
        id_account:item.id || '',
        id_name_banks:'',
        name:'',
        type:'',
        payment:'',
        price:'',
        date:new Date()
      }
  })

    useEffect(() => {
      if (item?.id) {
      reset((prev)=>({...prev,id_account:item.id}));
    }
    }, [item?.id, reset]);

  const mutation=useMutateAction({
    key:['flows'],
    mutationFn:(data:FlowsSchema) => postApi({url:'/flows',data:data})
    ,onSuccess:()=>{toast.success('Fluxo criado com sucesso',{position:'top-center'})},
    invalidateKeys:['flows']
    })

  async function onSubmit(item:FlowsSchema){
      const formattedData = {
        ...item,
        price: item.price.replace(',', '.')
      };
      
      mutation.mutate(formattedData)
    
  }

  return {handleSubmit,onSubmit,control,reset}
}