import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ChartContainer } from "./ui/chart";
import { Pie, PieChart, PieSectorShapeProps, ResponsiveContainer, Sector } from "recharts"
import { Empty, EmptyDescription, EmptyHeader } from "./ui/empty";
import FormSheet from "./FormSheet";
import FormGoal from "./FormGoal";
import { Goal } from '@/app/main/goals/page'
interface CardGoalProps {
  name?:string;
  value?:number;
  have?:number;
  data:{}[];
  config:{}
}



// Importe seus outros componentes (Empty, FormSheet, etc)

export default function CardGoal({ name, data, config }: CardGoalProps) {
  return (
    <div className="flex justify-start w-full p-4 dark">
      { data.length > 0 ? (
        <Card className="w-full max-w-md border-muted shadow-lg bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="text-center">{name}</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Altura fixa é CRUCIAL para o PieChart renderizar */}
            <div className="h-[250px] w-full"> 
              <ChartContainer config={config}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      dataKey="values"
                      nameKey="goal"
                      innerRadius={60}
                      stroke="none"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-md border-muted shadow-lg bg-card text-card-foreground">
          <CardContent className="pt-6">
            <Empty className="flex flex-col items-center text-center gap-4">
              <EmptyHeader className="text-xl font-semibold">
                Nenhuma meta registrada
              </EmptyHeader>
              
              <FormSheet
                buttonSheetName="Criar uma meta"
                title="Cadastro de Metas"
                description="Registre suas metas aqui"
              >
                <FormGoal />
              </FormSheet>

              <EmptyDescription className="text-muted-foreground text-sm">
                Você não tem nenhuma meta. <br />
                Crie uma apertando o botão acima.
              </EmptyDescription>
            </Empty>
          </CardContent>
        </Card>
      )}
    </div>
  )
}