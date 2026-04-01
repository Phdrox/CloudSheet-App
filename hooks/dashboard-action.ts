import { useMutateAction } from "./methodsApi"
import {  postApi} from "./requests/api-request"
import { useRouter } from "next/navigation"

export function useLogout(){
    const router=useRouter()
    const mutation=useMutateAction({
       key:['logout'],
       mutationFn:() => postApi({url:'/auth/logout'}),
       onSuccess:()=>{
            router.push('/auth/login')
        }
    })

    function onSubmit(){
         console.log('foi')
        return mutation.mutate({})
       
    }

    return {onSubmit}
}