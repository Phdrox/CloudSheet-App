'use client'
import {  z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutateAction } from "./methodsApi"
import {  deleteApi, postApi, putApi } from "./requests/api-request"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"
import { useDataMe } from "./useMe"


export function useFormRegister() {
  const router=useRouter()
  const schemaFormRegister= z.object({
    name: z.string("Preencha o campo nome").min(1,"deve ter no minímo 1 caractere"),
    email: z.email("Preencha o campo email").min(6,"deve ter no minímo 6 caractere ou não está no padrão"),
    password: z.string("Preencha o campo senha").min(8,"A senha deve ter no mínimo 8 caracteres"),
  })

  type RegisterSchema = z.infer<typeof schemaFormRegister>

  const {handleSubmit, control, reset} = useForm<RegisterSchema>({
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
    email: z.email("Preencha o campo email").min(6,"Seu email tem menos que 6 caractere ou está inválido"),
    password: z.string().min(8,"Sua senha é menor que 8 caractere"),
  })

  type LoginSchema = z.infer<typeof schemaFormLogin>
  const {handleSubmit, control, reset,setError}= useForm<LoginSchema>({
    resolver: zodResolver(schemaFormLogin),
    mode:"onSubmit",
    defaultValues:{
        email:'',
        password:'',
    }
  })
  
  const mutation=useMutateAction({
     key:['login'],
     mutationFn: (data: LoginSchema) => postApi({url:'/auth/login',data}),
     onSuccess:()=>{router.push('/main/dashboard')},
     onError:()=>{
       toast.error('Email ou senha',{position:'top-center'})
     },
  })

  async function onSubmit(item: LoginSchema) {
    mutation.mutate(item)
  }


  return {onSubmit,reset,handleSubmit,control,setError}
}

export function useFormFlows(){
   const item=useDataMe()

  const schemaFormFlows=z.object({
    id_categories: z.string().min(1, "Selecione uma categoria"),
    id_account: z.string(),
    id_name_banks:z.string().min(1,"Deve ter pelo menos um banco"),
    name: z.string().min(1, "Deve ter no mínimo 1 caractere"),
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
    ,onSuccess:()=>{
      toast.success('Fluxo criado com sucesso',{position:'top-center'})
    },

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
export function useFormFlowsEdit(id:string,data:any){
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
          name: '',
          id_categories: '',
          id_name_banks: '',
          id_account: '',
          type: '',
          payment: '',
          price: '',
          date: new Date()
        }
        })

    useEffect(() => {
      if (data && data?.id_categories) {
      reset({
        id_categories: data?.id_categories,
        id_account: data?.id_account || item?.id,
        id_name_banks: data?.id_bank,
        name: data?.name,
        type: data?.type,
        payment: data?.payment,
        price: String(data?.price), // Garanta que seja string para o input
        date: data?.date ? new Date(data?.date) : new Date()
      });
    }
    }, [item?.id, reset,data]);

  const mutation=useMutateAction({
    key:['historyId'],
    mutationFn:(data:FlowsSchema) => putApi({url:`/flows/${id}`,data:data})
    ,onSuccess:()=>{toast.success('Fluxo atualizado com sucesso',{position:'top-center'})},
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

export function useDeleteFlow(id:string){

  const router=useRouter()

  const mutation=useMutateAction({
    key:['deleteflow'],
    mutationFn:(id:string) => deleteApi({url:`/flows/${id}`})
    ,onSuccess:async ()=>{
      toast.success('Fluxo Deletado com sucesso',{position:'top-center'})
      router.replace('/main/history');
      
    },
    invalidateKeys:['flows',id]
    })

    function onSubmit(id:string){
      if(!id) return
      mutation.mutate(id)
    }

    return {onSubmit,isDeleting:mutation.isPending}

}

export function useFormGoal(){
   const item=useDataMe()

  const schemaFormGoal=z.object({
    id_account: z.string(),
    name: z.string(),
    value:z.string(),
    have:z.string()
  })

  type GoalSchema=z.infer<typeof schemaFormGoal>
  const {handleSubmit,control, reset}=useForm<GoalSchema>({
      resolver:zodResolver(schemaFormGoal),
      defaultValues:{
        id_account:item.id || '',
        name:'',
        value:'',
        have:''
      }
  })

    useEffect(() => {
      if (item?.id) {
      reset((prev)=>({...prev,id_account:item.id}));
    }
    }, [item?.id, reset]);

  const mutation=useMutateAction({
    key:['goal'],
    mutationFn:(data:GoalSchema) => postApi({url:'/goals',data:data})
    ,onSuccess:()=>{
      toast.success('Fluxo criado com sucesso',{position:'top-center'})
    },
    invalidateKeys:['goals']
  
    })

  async function onSubmit(item:GoalSchema){
      const formattedData = {
        ...item,
        have: item.have.replace(',', '.'),
        value:item.value.replace(',','.')
      };
      
      mutation.mutate(formattedData)
      
  }

  return {handleSubmit,onSubmit,control,reset}
}