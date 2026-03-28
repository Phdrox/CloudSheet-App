import { getApi} from "./requests/api-request"
import { useGetQueries } from "./methodsApi"

export function useDataMe(){
  const {data,isLoading,isError}= useGetQueries({
    key:['profile'],
    queryFn:() => getApi({url:'/auth/profile'}),
  });
  if(isLoading){
    console.log("Carregando...")
  }

  return data
}