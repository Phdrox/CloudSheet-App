'use client'
import CardGoal from '@/components/CardGoal';
import FormGoal from '@/components/FormGoal';
import FormSheet from '@/components/FormSheet';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useGetQueries } from '@/hooks/methodsApi';
import { getApi } from '@/hooks/requests/api-request';
import { Label, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"


export type Goal={
  have:string;
  value:string;
  id?:string;
  name?:string;
  lack:number;
  id_account?:string;
}
const configData={
    type:{
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
   } satisfies ChartConfig

export default function Goals() {
  const { data, isLoading } = useGetQueries({
    key: ['goals'],
    queryFn: () => getApi({ url: '/goals/mygoals' })
  });
  
  const dataGoal = data?.data;

  if (isLoading) return <p className="text-white">Carregando metas...</p>;
 const formart=(value:number)=>{
  const numberValue = value;
  if (value<1000){
    const formartValues=new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits:2,
    }).format(numberValue);

    return formartValues;
  }
  else{
     const formartValues=new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      notation: "compact",
      compactDisplay: "short"
    }).format(numberValue);

    return formartValues;
  }
 }
  return (
    <div className='p-5 pt-7'>
      <div className="w-full flex justify-center text-2xl text-white">
        <p className='w-full flex justify-center'>Metas</p>
        <div className='flex justify-end'>
          <FormSheet
            buttonSheetName="Criar uma meta"
            title="Cadastro de Metas"
            description="Registre suas metas aqui"
          >
            <FormGoal />
          </FormSheet>
        </div>
      </div>

      <div className='w-full flex justify-start mt-5 gap-5 flex-wrap'>
        {dataGoal?.length > 0 ? dataGoal.map((item: Goal, index: number) => {
          const chartData = [
            { type: 'have', amount: Number(item.have), fill: 'var(--color-have)' },
            { type: 'value', amount: Math.max(0, Number(item.value) - Number(item.have)), fill: 'var(--color-value)' }
          ];
           
          return (
            <CardGoal key={index} name={item.name!} id={item.id!} data={{
              have: item.have,
              id_account: item.id_account!,
              value:item.value,
              name: item.name!
            }
            }>
              <div className="h-[200px] w-[300px]"> 
                <ChartContainer config={configData}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart outerRadius={100}>
                      <ChartTooltip content={<ChartTooltipContent hideLabel  />} />
                      <Pie
                        data={chartData}
                        dataKey="amount" 
                        nameKey="type"   
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        stroke="none"
                      >
                         <Label
                           content={({ viewBox }) => {
                             if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                               return (
                                 <text
                                   x={viewBox.cx}
                                   y={viewBox.cy}
                                   textAnchor="middle"
                                   dominantBaseline="middle"
                                 >   
                                     <tspan
                                         x={viewBox.cx}
                                         y={(viewBox.cy || 0) - 8}
                                         className="fill-foreground font-bold"
                                     >
                                       {item?.lack && item?.lack>0?formart(item?.lack):formart(0)}
                                     </tspan>
                               
                                     <tspan
                                         x={viewBox.cx}
                                         y={(viewBox.cy || 0) + 24}
                                         className="fill-muted-foreground text-md font-semibold"
                                     >
                                         Falta 
                                     </tspan>
                                 </text>
                               )
                             }
                           }}
                         />
                        </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardGoal>
          );
        }) : (
          <p className='text-white text-lg'>Nenhuma meta encontrada.</p>
        )}
      </div>
    </div>
  );
}