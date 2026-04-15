import { Card, CardContent, CardHeader } from "./ui/card";
import { ChartContainer } from "./ui/chart";
import { Pie, PieChart } from "recharts"
import { Empty, EmptyDescription, EmptyHeader } from "./ui/empty";
import FormSheet from "./FormSheet";
import FormGoal from "./FormGoal";
interface CardGoalProps {
  name?:string;
  value?:number;
  have?:number;
  data:[]
}

export default function CardGoal({ name, value, have, data}: CardGoalProps) {
  return (
    <div>
      {data.length>0?
        <Card>
         <CardHeader>
            {name}
         </CardHeader>
         <CardContent>
            <PieChart>
              <Pie data={data} dataKey="visitors" nameKey="browser" />
            </PieChart>
         </CardContent>
        </Card>:
        <Card className="dark shadow-lg w-1/3">
         <CardContent>
            <Empty>
              <EmptyHeader>Nenhuma meta registrada</EmptyHeader> 
              <FormSheet 
                buttonSheetName="Criar uma meta" 
                children={<FormGoal/>} 
                title="Cadastro de Metas"
                 description="Registre suas metas aqui"
            />
              <EmptyDescription>
                Você não tem nenhuma meta. 
                Crie uma apertando o botão "Criar uma meta".
              </EmptyDescription>
            </Empty>
           
         </CardContent>
        </Card>
        
        }
    </div>
  )
}
