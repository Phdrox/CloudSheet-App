'use client'
import CardGoal from '@/components/CardGoal';
import { useGetQueries } from '@/hooks/methodsApi';
import { getApi } from '@/hooks/requests/api-request';

export type Goal={
  have:string;
  value:string;
  name?:string;
}

export default function Goals() {
  const {data,isLoading}=useGetQueries({
    key:['goals'],
    queryFn:()=>getApi({url:'/goals/mygoals'})

  })

  if (isLoading){
    console.log('loading')
  }
  
   const dataGoal=data?.data
   
   const DataPie=()=>{
    dataGoal?.length==0 && []
    const total= dataGoal?.map((i:Goal) => Number(i.value))
    const current= dataGoal?.map((i:Goal) => Number(i.have) )

   const dataPie=[
    {goal:'have',values:current},
    {goal:'value',values:total - current}
  ]

    return dataPie
  }
  
  const configData={
    values:{
      label:"Valores",
    },
    have:{
      label:"Tenho",
      color:"var(--color-chart-2)"
    },
    value:{
      label:"Preciso",
      color:"var(--color-ring)"

    }
   }
  return (
    <div className='p-5 pt-7'>
        <div className="w-full flex justify-center text-2xl text-white ">
            Metas
        </div> 
      <CardGoal data={DataPie()} config={configData} />
     
    </div>
  );
}
