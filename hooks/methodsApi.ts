import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MutationFunction,QueryFunction } from "@tanstack/react-query/";

type QueryType<T>={
    key:unknown[],
    queryFn:QueryFunction<T>,
    staleTime?:number
    retry?:boolean
}

type MutateType<TData, TVariables> = {
    key: unknown[]
    mutationFn: MutationFunction<TData, TVariables>;
    invalidateKeys?: unknown[];
    onSuccess:()=>void
};

export function useMutateAction<TData = unknown, TVariables = unknown>
({key,mutationFn,invalidateKeys,onSuccess}:MutateType<TData,TVariables>){ 
    const queryClient=useQueryClient()
    return useMutation({
         mutationFn: mutationFn,
         onMutate: async () => {
           await queryClient.cancelQueries({queryKey:key});
        },
        onSuccess,
        onError:() => {},
        onSettled:() => {
            if (invalidateKeys) {
                  queryClient.invalidateQueries({queryKey:invalidateKeys}).then();
            }
        }
    })
}

export function useGetQueries<T>({key,queryFn,staleTime,retry}:QueryType<T>){
 return useQuery({
    queryKey:key,
    queryFn:queryFn,
    staleTime, // Considera o dado "fresco" por 5 minutos
    retry
})
}
