import { useGetQueries } from "./methodsApi"
import { getApi } from "./requests/api-request"


export const useSaldoAcumulado = (date:string) => {
    const {data,isLoading} =useGetQueries({
        key:['flows','deleteflow','historyId',date],
        queryFn:()=> getApi({url:'/flows/myflows'})
        })
    
        if (isLoading){
            console.log('loading')
        }
        const dataFlow=data?.data!
        const saldosAcumulado=dataFlow?.reduce((acc:any,item:any)=>{
            const [yearStr, monthStr, dayStr] = item.date.split('T')[0].split('-');
          
            const dateKey= `${yearStr}-${monthStr}-${dayStr}`;
            

            if (Number(monthStr) !== Number(date)) return acc;
            
            if(!acc[dateKey]){
                acc[dateKey]={date:dateKey,saldo:0}
            }

            if(item.type ==='ganho') acc[dateKey].saldo += Number(item.price);
            if(item.type ==='gasto') acc[dateKey].saldo -= Number(item.price);
            return acc;
         },{})
         
         if (!saldosAcumulado) return [];
         
         const saldoAcumulado=Object.values(saldosAcumulado).sort(
            (a:any,b:any)=> new Date(a.date).getTime() - new Date(b.date).getTime()).map((item: any) => {
            return {
                date: item.date,
                saldo: item.saldo
            }
        })
         
        var total = 0
        const resultadoFinal = saldoAcumulado.map((item: any) => {
        total += item.saldo
        
        return {date: item.date,saldo: total}
        })

    return {resultadoFinal}
}
